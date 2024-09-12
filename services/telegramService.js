const axios = require('axios');
const { noctianApiUrl } = require('../../config/config');

async function sendUserData(userData) {
    try {
        const response = await axios.post(`${noctianApiUrl}/users`, userData);
        console.log('User data sent:', response.data);
    } catch (error) {
        console.error('Error sending user data:', error);
    }
}

async function startGame(userId) {
    try {
        const response = await axios.post(`${noctianApiUrl}/users/${userId}/start-game`);
        console.log('Game started:', response.data);
    } catch (error) {
        console.error('Error starting the game:', error);
        throw error;
    }
}

module.exports = {
    sendUserData,
    startGame
};