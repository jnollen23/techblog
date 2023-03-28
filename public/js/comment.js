function leaveComment(e) {
    e.preventDefault();
    const id = document.getElementById('submitComment').dataset.id;

    const payload = {
        comment: document.getElementById('contentInput').value.trim(),
    }
    if (payload.comment.length > 0) {
        fetch(`/api/posts/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(data => data.json())
            .then(data => {
                if (data.message === 'success') {
                    window.location.reload();
                }
                else {
                    document.getElementById('failedComment').removeAttribute('hidden');
                }

            });
    }

    return false;
}


document.getElementById('leaveComment').addEventListener('submit', leaveComment);