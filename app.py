from flask import Flask, request, render_template
from utils import save_player_data, load_player_data, save_player_data


app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/api/saveplayerdata', methods=['POST'])
def savedata():
    """ Saves player data to the database """
    player_data = request.json
    save_player_data(player_data)
    return "Player data successfully uploaded", 200


@app.route('/api/getplayerdata/<string:username>', methods=['GET'])
def getplayerdata(username):
    """ Retrieves player data from the database """
    player_data = load_player_data(username)
    return player_data, 200


if __name__ == "__main__":
    app.run(debug=True)
