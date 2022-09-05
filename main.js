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

//show msg function
function showMsg(message,type){
    msg.textContent=message;
        msg.classList.add(type);
        setTimeout(()=>{msg.classList.remove(type);
        msg.textContent=''},2000);
}

// show output on frontend
function showData(obj){
    const createTextNode=`<li class="listItem">${obj.amount}-${obj.category}-${obj.description}<button class="btn1 del">Delete</button><button class="btn1 edit">Edit</button></li>`;
    userList.innerHTML+=createTextNode;
}

function submit(event){
    event.preventDefault();

    // showing error messege if input is empty
    if(amountInput.value==='' || descriptionInput.value==='' || categoryInput.value==''){
        showMsg("Please enter all field ❌","error");
    }
    else{
        // showing success messege on submitting
        showMsg("Expenses added ✅","success");

        // creating object from user detail 
        let obj={
            amount:amountInput.value,
            category:categoryInput.value,
            description:descriptionInput.value
        };

        // Adding data to localStorage
        localStorage.setItem(`${obj.amount}-${obj.category}-${obj.description}`,JSON.stringify(obj));

        // Adding data to frontend
        showData(obj);
        
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
            
            showData(data);
        }
    }

// Delete data
function detetedata(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
            deleteFromScreenAndLocalStorage(e);
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
        deleteFromScreenAndLocalStorage(e);
    }
}

function deleteFromScreenAndLocalStorage(e){
    let textKey=e.target.parentElement.firstChild.textContent;
        localStorage.removeItem(textKey);
        userList.removeChild(e.target.parentElement);
}