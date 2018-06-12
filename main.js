document.getElementById('userForm').addEventListener('submit',createUser);

var count;
var schedules = [];

function onload(){
    if(localStorage.getItem('users')===null) {
        count = 0;
    } 
    else {
        console.log("onload ka else called");
        var users = JSON.parse(localStorage.getItem('users'));
        count = users[users.length-1].id;
    }
    displayUsers();
}

function createUser(e){
    count++;
    var userName = document.getElementById('userName').value;

    var user = {
        name : userName,
        id : count,
        clicked : false
    }

    if(localStorage.getItem('users')===null){
        var users = [];
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        
    }
    else{
        
        var users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
    }
    
    document.getElementById('userForm').reset();
    displayUsers();
    e.preventDefault();
}

function displayUsers(){
    var users = JSON.parse(localStorage.getItem('users'));
    
    var userResults = document.getElementById('users');
    userResults.innerHTML='';
    
    for(var i=0;i<users.length;i++){
        var name = users[i].name;
        var id = users[i].id;
        userResults.innerHTML +='<div id="'+id+'" class"user" onclick="createSidebar(\''+id+'\')">'+
                                name+
                                '</div>';
                            
                           
    }
}

function createSidebar(id){
    var users = JSON.parse(localStorage.getItem('users'));
    for(var i=0;i<users.length;i++){
        if(users[i].id==id){
            users[i].clicked = true;
            console.log(users[i].clicked);

        }
        else{
            users[i].clicked = false;
            console.log(users[i].clicked);
        }
            
    }
    localStorage.setItem('users',JSON.stringify(users));
    changeUserColor();
    changeDIVS();
    
    var menu = document.getElementById('sideBar');
    menu.innerHTML= '<div id="sideMenu">'+
                    '<button class="contents" onclick="showSchedule(this)" data-id="'+id+'">YOUR SCHEDULE</button>'+
                    '</div>';
    
    
    
}

function showSchedule(el) {
    var id = el.getAttribute('data-id');
    var newUser = document.getElementById('newUser');
    newUser.hidden = false;

    var home = document.getElementById('homeBtn');
    home.hidden = false;
    
    console.log("Show Schedule Called");
    var mainPlace0 = document.getElementById('mainPlace0');
    mainPlace0.hidden = true;
    if(localStorage.getItem(schedules[id])===null){     
         
        var mainPlace1 = document.getElementById('mainPlace1');
        mainPlace1.hidden = false; 
        var createBtn = document.getElementById('createBtn');
        createBtn.setAttribute('data-id', id);
        
        createBtn.addEventListener('click', function(){
            createSchedule(this);
        });        
    }
    else{
        

    }
}

function createSchedule(el){
    var id = el.getAttribute('data-id');
    console.log("Create schedule called");
    var mainPlace1 = document.getElementById('mainPlace1');
    mainPlace1.hidden = true;

    var schedulePage = document.getElementById('schedulePage');
    schedulePage.hidden = false;
    
    var savBtn = document.getElementById('saveSchBtn');
    savBtn.setAttribute('data-id',id);
    savBtn.addEventListener('click',function(){
        saveSchedule(this);
        
    });
}

function saveSchedule(el){
    var id = el.getAttribute('data-id');

    var time1 = document.getElementById('time1').value;
    var time2 = document.getElementById('time2').value;
    var time3 = document.getElementById('time3').value;
    var task1 = document.getElementById('task1').value;
    var task2 = document.getElementById('task2').value;
    var task3 = document.getElementById('task3').value;
    var schedule = {
        time : [time1,time2,time3],
        task : [task1,task2,task3],
        id : id
    }

    if(localStorage.getItem('schedules')===null){
        var schedules = [];
        schedules.push(schedule);
        localStorage.setItem('schedules',JSON.stringify(schedules));
    }
    else{
        var schedules = JSON.parse(localStorage.getItem('schedules'));
        schedules.push(schedule);
        localStorage.setItem('schedules',JSON.stringify(schedules));
    }
}


//RANDOM FUNCTIONS
function addUser(){
    var mainPlace0 = document.getElementById('mainPlace0');
    mainPlace0.hidden = false;

    var mainPlace1 = document.getElementById('mainPlace1');
    mainPlace1.hidden = true;
}

function changeUserColor(){
    var users = JSON.parse(localStorage.getItem('users'));
    for(var i=0;i<users.length;i++){
        if(users[i].clicked){
                var user = document.getElementById(users[i].id);
                user.style.backgroundColor = "red";
                console.log("Changed to red");
        }
        else{
            var user = document.getElementById(users[i].id);
            user.style.backgroundColor = "blue";
            console.log("Changed to blue");
        }
    }
}

function changeDIVS(){
    var schedulePage = document.getElementById('schedulePage');
    schedulePage.hidden = true;

    var mainPlace1 = document.getElementById('mainPlace1');
    mainPlace1.hidden = true;

    var mainPlace0 = document.getElementById('mainPlace0');
    mainPlace0.hidden = false; 
}


