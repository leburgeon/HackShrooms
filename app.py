from flask import Flask, request, render_template, jsonify
from utils import save_player_data, load_player_data, save_player_data


app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/api/saveplayerdata', methods=['POST'])
def savedata():
    print('CALLED')
    """ Saves player data to the database """
    player_data = request.json
    save_player_data(player_data)
    return "Player data successfully uploaded", 200


@app.route('/api/getplayerdata/<string:username>', methods=['GET'])
def getplayerdata(username):
    """ Retrieves player data from the database """
    player_data = load_player_data(username)
    print(player_data)
    return jsonify(player_data)


if __name__ == "__main__":
    app.run(debug=True)
