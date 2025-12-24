""" Helper methods for interacting with the json database """
import json


def load_all_data() -> list[dict]:
    """Load saves.json"""

    with open('saves.json') as f:
        d = json.load(f)
        return d


def load_player_data(username: str) -> dict | None:
    """Given a username, retrieve all of the information for that user"""

    all_data = load_all_data()

    for save in all_data:
        if save.get("username") == username:
            return save


def save_player_data(player_data: dict) -> bool:
    """Given a payload of player data, update the saves.json with the corresponding data
    If username exists, update existing player information.
    Otherwise, create new entry."""

    all_data = load_all_data()
    username_to_update = player_data.get("username")

    if not all_data:
        all_data = []

    for idx, player_info in enumerate(all_data):

        if player_info.get("username") == username_to_update:
            all_data[idx] = player_data
            with open('saves.json', 'w') as f:
                json.dump(all_data, f)
                return True

    all_data.append(player_data)
    with open('saves.json', 'w') as f:
        json.dump(all_data, f)
        return True


def fetch_top_5_players() -> list[dict]:
    """ Works out the top 5 players """
    all_players = load_all_data()
    sorted_players = sorted(
        all_players, key=lambda d: d['lifetimeMushrooms'])

    top_players = []
    while len(sorted_players) > 0 and len(top_players) < 5:
        player = sorted_players.pop()
        top_players.append(
            {'username': player['username'], 'lifetimeMushrooms': player['lifetimeMushrooms']})

    return top_players


if __name__ == "__main__":
    test_payload = {"username": "test3",
                    "score": 999,
                    "portobello": 99}
    new_saves = save_player_data(test_payload)
    print(new_saves)
