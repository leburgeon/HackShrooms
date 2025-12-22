from flask import Flask, request, render_template
from utils import save_player_data, load_player_data, add_new_user


app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/saveplayerdata', methods=['POST'])
def savedata():
    """ Saves player data to the database """
    player_data = request.json
    save_player_data(player_data)


@app.route('/getplayerdata', methods=['GET'])
def getplayerdata():
    """ Retrieves player data from the database """
