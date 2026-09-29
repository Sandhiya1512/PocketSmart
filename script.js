let transactions = JSON.parse(localStorage.getItem('pocketSmart')) || [];
let budget = localStorage.getItem('budget') || 10000;

function updateUI() {
    const list = document.getElementById('list');
    const balanceEl = document.getElementById('balance');
    const incomeEl = document.getElementById('income');
    const expenseEl = document.getElementById('expense');
    if(!list) return;
    list.innerHTML = '';
    let income=0, expense=0;
    transactions.forEach((t, i) => {
        if(t.type==='income') income+=t.amount; else expense+=t.amount;
        const li=document.createElement('li');
        li.innerHTML=`<span><b>${t.category||'Other'}</b> - ${t.desc}</span><span class="${t.type}-text">${t.type==='income'?'+':'-'}₹${t.amount} <b onclick="remove(${i})" style="cursor:pointer"> x</b></span>`;
        list.appendChild(li);
    });
    balanceEl.innerText=`₹${(income-expense).toFixed(2)}`;
    incomeEl.innerText=`₹${income}`;
    expenseEl.innerText=`₹${expense}`;
    localStorage.setItem('pocketSmart', JSON.stringify(transactions));
}
function addTransaction(){
    const desc=document.getElementById('desc').value;
    const amount=parseFloat(document.getElementById('amount').value);
    const type=document.getElementById('type').value;
    const category=document.getElementById('category').value;
    if(!desc||!amount){alert('Fill all fields');return;}
    transactions.push({desc,amount,type,category,date:new Date().toLocaleDateString()});
    document.getElementById('desc').value=''; document.getElementById('amount').value='';
    updateUI();
}
function remove(i){transactions.splice(i,1);updateUI();}
function clearAll(){if(confirm('Clear all?')){transactions=[];updateUI();}}
updateUI();
