
function submitSignup(){
    const data={
        username:document.getElementById('signupUsername').value.trim(),
        email:document.getElementById('signupEmail').value.trim(),
        password:document.getElementById('signupPassword').value.trim()
    }
    if(data.username && data.email && data.password){
        fetch('/api/login/signup',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        .then(data=>{
            if(data.ok)
                document.location.replace('/dashboard');
            else {
                alert('failed to create account');
            }
        })
    }
}

function submitLogin(){
    const data={
        username:document.getElementById('loginUsername').value.trim(),
        password:document.getElementById('loginPassword').value.trim()
    }
    if(data.username && data.password){
        fetch('/api/login/',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        .then(data=>{
            if(data.ok)
                document.location.replace('/dashboard');
            else {
                alert('Username or Password is incorrect');
            }
        })
    }
}