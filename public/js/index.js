function submitLogout(){
    fetch('/api/login/logout',{
        method:'POST'
    })
    .then(data=>{
        if(data.ok)
            document.location.replace('/');
        else {
            alert('failed to create account');
        }
    })
}


const locationOfPage = document.location.pathname;
if(locationOfPage ==='/Dashboard'){
    document.getElementById('dash').classList.add('active');
}
else if(locationOfPage === '/Login' || locationOfPage === '/Signup'){
    document.getElementById('login').classList.add('active');
}
else{
    document.getElementById('home').classList.add('active');
}


function cancelPost(){
    window.location.replace('/Dashboard');
}