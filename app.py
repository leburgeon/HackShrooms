from flask import Flask, request, render_template, jsonify, redirect, url_for
from utils import save_player_data, load_player_data, save_player_data, fetch_top_5_players


app = Flask(__name__)

print(fetch_top_5_players())


@app.route('/')
def renderlogin():
    return render_template('login.html')


@app.route('/play')
def rendergame():
    username = request.args.get('username')
    if username is None:
        return redirect(url_for('renderlogin'))
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

# @app.route('/api/leaderboard', methods=['GET'])


# def getleaderboard():


if __name__ == "__main__":
    app.run(debug=True)
