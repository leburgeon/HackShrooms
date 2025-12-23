

    const apiUrl = '/api/'

    const getPlayerData = async (username) => {
        try{
            const response = await fetch(apiUrl + 'getplayerdata/' + username)
            console.log(response.json())
            return response.json()
        } catch (error) {
            console.error(error)
        }
        
    }

    const savePlayerData = async (userData) => {
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            response = await fetch(apiUrl + 'saveplayerdata')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            window.alert('Could not save data! ' + error.message)
            console.error(error)
        }
    }
