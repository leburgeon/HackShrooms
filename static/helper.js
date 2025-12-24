const apiUrl = '/api/'

const getPlayerData = async (username) => {
    // Returns null if the username does not exist
    try{
        const response = await fetch(apiUrl + 'getplayerdata/' + username)
        playerdata = await response.json()
        return playerdata
    } catch (error) {
        console.log('errored')
        console.error(error)
    }
    
}

const savePlayerData = async (userData) => {
    
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    try {
        response = await fetch(apiUrl + 'saveplayerdata', options)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
    } catch (error) {
        window.alert('Could not save data! ' + error.message)
        console.error('Error saving data ')
    }
}

const getLeaderBoardGame = async () => {
    try {
        const response = await fetch(apiUrl + '/leaderboard')
        leaderboard_list = response.json()
        return leaderboard_list
    } catch (error){
        console.log('Error fetching leaderboard')
    }
}

function handleSavePlayerData() {
    console.log(Game)
    savePlayerData(Game)
}