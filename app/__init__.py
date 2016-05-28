from flask import Flask, jsonify
from flask.ext.cors import CORS
from flask.ext.sqlalchemy import SQLAlchemy
from werkzeug.exceptions import NotFound

app = Flask(__name__, static_folder='static')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://{0}:{1}@{2}/{3}".format('remembered',
                                                                                 'growingdever',
                                                                                 'localhost:3306',
                                                                                 'remembered')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

from app.models.user import UserModel
from app.models.label import LabelModel
from app.models.note import NoteModel
from app.models.labelling import LabellingModel

db.create_all()


from app.utils.model import model_to_dict


@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/api/notes')
def notes():
    return jsonify({
        'items': [model_to_dict(item) for item in NoteModel.query.all()]
    })


@app.route('/api/note/<int:note_id>')
def note(note_id):
    item = NoteModel.query.filter(NoteModel.id == note_id).first()
    if item is None:
        raise NotFound

    return jsonify({
        'item': model_to_dict(item)
    })


@app.route('/api/labels')
def labels():
    return jsonify({
        'items': [model_to_dict(item) for item in LabelModel.query.all()]
    })


@app.route('/api/label/<int:label_id>')
def label(label_id):
    item = LabelModel.query.filter(LabelModel.id == label_id).first()
    if item is None:
        raise NotFound

    return jsonify({
        'item': model_to_dict(item)
    })
