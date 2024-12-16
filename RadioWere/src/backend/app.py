from flask import Flask, request, jsonify

app = Flask(__name__)

# Simula um banco de dados em memoria
playlists = {}

@app.route('/api/playlists/<string:name>', methods=['GET'])
def get_playlist(name):
    playlist = playlists.get(name)
    if playlist:
        return jsonify({"data": playlist})
    return jsonify({"error": "Playlist not found"}), 404

@app.route('/api/playlists', methods=['POST'])
def create_playlist():
    data = request.get_json()
    name = data.get('name')
    playlist_data = data.get('data', [])
    if name in playlists:
        return jsonify({"error": "Playlist already exists"}), 400
    playlists[name] = playlist_data
    return jsonify({"message": "Playlist created"}), 201

@app.route('/api/playlists/<string:name>', methods=['PUT'])
def update_playlist(name):
    data = request.get_json()
    playlist_data = data.get('data')
    if name not in playlists:
        return jsonify({"error": "Playlist not found"}), 404
    playlists[name] = playlist_data
    return jsonify({"message": "Playlist updated"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
