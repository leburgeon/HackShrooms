import axios from 'axios'

const getPlayerData = async (username) => {
    const response = await axios.get('/getplayerdata/${username}')
    return response
}

const savePlayerData = async (userData) => {
    const response = await axios.post('/saveplayerdata', userData)
    return response
}

export default {getPlayerData}