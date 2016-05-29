from flask import Flask, jsonify
from flask.ext.cors import CORS
from flask.ext.restful import Api, Resource
from flask.ext.sqlalchemy import SQLAlchemy
from werkzeug.exceptions import NotFound

app = Flask(__name__, static_folder='static')
CORS(app)

api_root = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{0}:{1}@{2}/{3}'.format('remembered',
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


@api_root.resource('/api/notes')
class APINotes(Resource):
    def get(self):
        return jsonify({
            'items': [model_to_dict(item) for item in NoteModel.query.all()]
        })


@api_root.resource('/api/notes/<int:note_id>')
class APINote(Resource):
    def get(self, note_id):
        print(note_id)
        item = NoteModel.query.filter(NoteModel.id == note_id).first()
        if item is None:
            raise NotFound

        return jsonify({
            'item': model_to_dict(item)
        })


@api_root.resource('/api/labels')
class APILabels(Resource):
    def get(self):
        return jsonify({
            'items': [model_to_dict(item) for item in LabelModel.query.all()]
        })


@api_root.resource('/api/labels/<int:label_id>')
class APILabel(Resource):
    def get(self, label_id):
        item = LabelModel.query.filter(LabelModel.id == label_id).first()
        if item is None:
            raise NotFound

        return jsonify({
            'item': model_to_dict(item)
        })
