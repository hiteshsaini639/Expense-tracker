"use strict"
const myform=document.querySelector(".my-form");
const amountInput=document.getElementById("amount");
const descriptionInput=document.getElementById("description");
const categoryInput=document.getElementById("category");
const userList=document.getElementById("users");
const msg=document.querySelector(".msg");
const body=document.querySelector("body");
const btn=document.querySelector(".btn");
const btndel=document.querySelector('.del');
const btnedit=document.querySelector('.edit');

myform.addEventListener('mouseover',()=>{
    myform.classList.add("bg-dark");
});

myform.addEventListener('mouseout',()=>{
    myform.classList.remove("bg-dark")
});

// on DOM loading
window.addEventListener('DOMContentLoaded',loadLocalData);

// delete
userList.addEventListener('click',detetedata);

// edit
userList.addEventListener('click',editData);

// submit
btn.addEventListener('click',submit);

function submit(event){
    event.preventDefault();

    // showing error messege if input is empty
    if(amountInput.value==='' || descriptionInput.value==='' || categoryInput.value==''){
        msg.classList.add("error");
        msg.textContent="Please enter all field ❌";
        setTimeout(function(){
        msg.classList.remove("error");
        msg.textContent='';},2000);
    }
    else{
        // showing success messege on submitting
        msg.textContent="Expenses added ✅";
        msg.classList.add('success');
        setTimeout(()=>{msg.classList.remove('success');
        msg.textContent='';},2000);

        // creating object from user detail 
        let obj=JSON.stringify({
            amount:amountInput.value,
            category:categoryInput.value,
            description:descriptionInput.value
        });

        // Adding data to localStorage
        localStorage.setItem(`${amountInput.value}-${categoryInput.value}-${descriptionInput.value}`,obj);

        // Adding data to frontend
        let li=document.createElement('li');

        let btndel =document.createElement('button');
        let btnedit =document.createElement('button');

        btndel.className='btn1 del';
        btnedit.className='btn1 edit';
        li.className='listItem';

        btndel.appendChild(document.createTextNode('Delete'));
        btnedit.appendChild(document.createTextNode('Edit'));

        li.appendChild(document.createTextNode(`${amountInput.value}-${categoryInput.value}-${descriptionInput.value}`));
        li.appendChild(btndel);
        li.appendChild(btnedit);
        userList.appendChild(li);

        // clearing data
        amountInput.value='';
        descriptionInput.value='';
        categoryInput.value='';
    }

}

// Show localstorage data on DOM load
function loadLocalData(){
        for(let i=0;i<localStorage.length;i++){
            let jsonData=localStorage.getItem(localStorage.key(i));
            let data=JSON.parse(jsonData);
            let li=document.createElement('li');

            let btndel =document.createElement('button');
            let btnedit =document.createElement('button');

            btndel.className='btn1 del';
            btnedit.className='btn1 edit';
            li.className='listItem';

            btndel.appendChild(document.createTextNode('Delete'));
            btnedit.appendChild(document.createTextNode('Edit'));

            li.appendChild(document.createTextNode(`${data.amount}-${data.category}-${data.description}`));
            li.appendChild(btndel);
            li.appendChild(btnedit);
            userList.appendChild(li);
            
        }
    }

// Delete data
function detetedata(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
            let textKey=e.target.parentElement.firstChild.textContent;
            localStorage.removeItem(textKey);
            userList.removeChild(e.target.parentElement);
        }
    }
}

// Edit data
function editData(e){
    if(e.target.classList.contains('edit')){
        let textKey=e.target.parentElement.firstChild.textContent;
        let obj=JSON.parse(localStorage.getItem(textKey));
        amountInput.value=obj.amount;
        descriptionInput.value=obj.description;
        categoryInput.value=obj.category;
        localStorage.removeItem(textKey);
        userList.removeChild(e.target.parentElement);
    }
}