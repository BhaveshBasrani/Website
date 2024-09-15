document.addEventListener('DOMContentLoaded', () => {
    const isIndexPage = window.location.pathname === '/index.html' || window.location.pathname === '/';  // Check if on index.html

    // Only proceed if we are on the index page where login is required
    if (isIndexPage) {
        const loginButton = document.getElementById('login-button');
        const userNameElement = document.getElementById('user-name');
        const userProfilePictureElement = document.getElementById('user-profile-picture');

        loginButton.addEventListener('click', () => {
            window.location.href = AUTHORIZATION_URL;
        });

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            exchangeCodeForToken(code);
        } else {
            const accessToken = localStorage.getItem('access_token');
            const tokenExpiry = localStorage.getItem('token_expiry');

            if (accessToken && tokenExpiry && new Date().getTime() < tokenExpiry) {
                fetchUserProfile(accessToken);
            }
        }
    }
});

// Remove the clear session and logout function
// Handle the token exchange and user profile fetching
function exchangeCodeForToken(code) {
    const client_id = '1082711487828734002';
    const client_secret = 'OVYyOEHY8Cj4VM_JTJkUueXu9MjopJKQ';
    const redirect_uri = 'https://www.yourjamify.tech/';

    const data = new URLSearchParams({
        client_id,
        client_secret,
        grant_type: 'authorization_code',
        code,
        redirect_uri,
    });

    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            const tokenExpiryTime = new Date().getTime() + (data.expires_in * 1000);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('token_expiry', tokenExpiryTime);
            fetchUserProfile(data.access_token);
        }
    })
    .catch(error => console.error('Error exchanging code for token:', error));
}

function fetchUserProfile(accessToken) {
    fetch('https://discord.com/api/users/@me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(userData => {
        if (userData.id && userData.username) {
            // Set the username and profile picture
            const userNameElement = document.getElementById('user-name');
            const userProfilePictureElement = document.getElementById('user-profile-picture');
            const loginButton = document.getElementById('login-button');

            userNameElement.textContent = userData.username;
            userProfilePictureElement.src = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            userProfilePictureElement.style.display = 'block';  // Show profile picture
            loginButton.style.display = 'none';  // Hide login button after login
        } else {
            console.error('Failed to fetch user profile:', userData);
        }
    })
    .catch(error => console.error('Error fetching user profile:', error));
}
