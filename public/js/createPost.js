function createPost(e) {
    e.preventDefault();
    const data = {
        title: document.getElementById('titleInput').value.trim(),
        body: document.getElementById('contentInput').value.trim(),
    }
    let method = 'POST';
    let path = "/api/posts/"
    if (document.getElementById('action').dataset.type === "update") {
        method = 'PUT';
        path = `/api/posts/${document.getElementById('action').dataset.id}`;
    }
    fetch(path, {
        method: method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(data => data.json())
        .then(data => {
            if (data.message === 'success') {
                document.location.replace('/Dashboard');
            }
            else {
                document.getElementById('postError').removeAttribute('hidden');
            }
        });
    return false;
}


document.getElementById('createPost').addEventListener('submit', createPost);