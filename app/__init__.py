from flask import Flask, jsonify
from flask.ext.cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)


@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/api/notes')
def notes():
    items = []
    for i in range(0, 5):
        items.append({
            'id': i,
            'title': 'note{}'.format(i),
            'content': 'note{} contents'.format(i)
        })

    return jsonify({
        'items': items
    })
