from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import NotFound, BadRequest

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

    def post(self):
        data = request.get_json()
        for key in ['title', 'content', 'label_ids']:
            if key not in data:
                raise BadRequest

        title = data['title']
        content = data['content']
        label_ids = data['label_ids']

        new_note = NoteModel(
            user_id=1,
            title=title,
            content=content)
        db.session.add(new_note)
        db.session.commit()

        for label_id in label_ids:
            new_labelling = LabellingModel(
                user_id=1,
                note_id=new_note.id,
                label_id=label_id)
            db.session.add(new_labelling)

        db.session.commit()

        return jsonify(model_to_dict(new_note))


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

    def post(self):
        data = request.get_json()
        if 'title' not in data:
            raise BadRequest

        new_label = LabelModel(
            user_id=1,
            title=data['title'])
        db.session.add(new_label)
        db.session.commit()

        return jsonify(model_to_dict(new_label))


@api_root.resource('/api/labels/<int:label_id>')
class APILabel(Resource):
    def get(self, label_id):
        item = LabelModel.query.filter(LabelModel.id == label_id).first()
        if item is None:
            raise NotFound

        return jsonify({
            'item': model_to_dict(item)
        })
