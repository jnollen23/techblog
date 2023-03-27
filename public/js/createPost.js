function createPost(e){
    e.preventDefault();
    const data={
        title:document.getElementById('titleInput').value.trim(),
        body:document.getElementById('contentInput').value.trim(),
    }

    fetch('/api/posts/',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    })
    .then(data=>data.json())
    .then(data=>{
        if(data.message === 'success'){
            document.location.replace('/Dashboard');
        }
        else{
            document.getElementById('postError').removeAttribute('hidden');
        }
    });

    return false;
}

document.getElementById('createPost').addEventListener('submit', createPost);