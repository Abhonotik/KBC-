// Function to display the leaderboard
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear current leaderboard display

    // Display leaderboard in descending order of scores
    leaderboard.sort((a, b) => b.score - a.score);
    
    leaderboard.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('leaderboard-entry');
        entryDiv.innerHTML = `<strong>${entry.userId}</strong>: ${entry.score}`;
        leaderboardList.appendChild(entryDiv);
    });
}

// Function to redirect back to the login page
function goBackToLogin() {
    window.location.href = 'login.html'; // Redirect to the login page
}

// Display the leaderboard when the page loads
window.onload = function() {
    displayLeaderboard();
};
