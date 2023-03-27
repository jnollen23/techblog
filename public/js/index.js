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

