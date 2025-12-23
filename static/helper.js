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
        console.error(error)
    }
}


const checkIfUserLoggedIn = () => {
    return localStorage.getItem('username') != null
}

const clearUserData = () => {
    localStorage.clear()
}

const setUserData = (username) => {
    localStorage.setItem('username', username)
}

async function handleLogin () {
    var username = ' '
    while (username.length < 3 || username.length > 10)
        username = prompt('Enter an existing username to create or load a save!                     (3-10 chars)')

    playerdata = await getPlayerData(username)

    if (playerdata != null){
        Game = playerdata
    }

    Game.username = username
}

function handleSavePlayerData() {
    console.log(Game)
    savePlayerData(Game)
}