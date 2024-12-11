window.onload = function () {
    const score = localStorage.getItem('score');
    document.getElementById('score').textContent = score;
}
