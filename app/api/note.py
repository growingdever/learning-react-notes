from app import api_root, db
from app.models.label import LabelModel
from app.models.labelling import LabellingModel
from app.models.note import NoteModel
from app.utils.model import model_to_dict
from flask import request, jsonify
from flask.ext.restful import Resource
from werkzeug.exceptions import NotFound, BadRequest


@api_root.resource('/api/notes/<int:note_id>')
class APINote(Resource):
    def get(self, note_id):
        note = NoteModel.query.filter(NoteModel.id == note_id).first()
        if note is None:
            raise NotFound

        labellings = db.session.query(LabelModel, LabellingModel). \
            join(LabellingModel, LabelModel.id == LabellingModel.label_id). \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.note_id == note_id). \
            all()

        note = model_to_dict(note)
        note['labels'] = [{'id': item.LabelModel.id, 'title': item.LabelModel.title} for item in labellings]

        return jsonify({
            'item': note
        })

    def put(self, note_id):
        data = request.get_json()
        for key in ['title', 'content', 'label_ids']:
            if key not in data:
                raise BadRequest

        note = NoteModel.query.filter(NoteModel.id == note_id).first()
        if note is None:
            raise NotFound

        title = data['title']
        content = data['content']
        label_ids = data['label_ids']

        labellings = LabellingModel.query. \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.note_id == note_id). \
            all()
        for item in labellings:
            db.session.delete(item)

        for label_id in label_ids:
            new_labelling = LabellingModel(
                user_id=1,
                note_id=note_id,
                label_id=label_id)
            db.session.add(new_labelling)

        note.title = title
        note.content = content

        db.session.commit()

        labellings = db.session.query(LabelModel, LabellingModel). \
            join(LabellingModel, LabelModel.id == LabellingModel.label_id). \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.note_id == note_id). \
            all()

        note = model_to_dict(note)
        note['labels'] = [{'id': item.LabelModel.id, 'title': item.LabelModel.title} for item in labellings]

        return jsonify({
            'item': note
        })

    def delete(self, note_id):
        labellings = LabellingModel.query. \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.note_id == note_id). \
            all()
        for item in labellings:
            db.session.delete(item)

        note = NoteModel.query.filter(NoteModel.user_id == 1).filter(NoteModel.id == note_id).first()
        db.session.delete(note)

        db.session.commit()

        return jsonify({
            'success': True
        })
