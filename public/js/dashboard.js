
function deleteConfirm(id, title) {
    const modal = document.getElementById('deleteModal');
    const info = document.getElementById('modalInfo');
    modal.dataset.deleteId = id;
    info.innerText = title;
}

function deletePost() {
    const modal = document.getElementById('deleteModal');

    fetch(`/api/posts/${modal.dataset.deleteId}`, {
        method: 'delete'
    }).then(() => {
        document.location.replace('/dashboard');
    });
}

function updatePost(id){
    document.location.replace(`/Dashboard/update/${id}`);
}

document.getElementById('deleteConfirm').addEventListener('click', deletePost);