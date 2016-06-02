from app import api_root, db
from app.models.label import LabelModel
from app.models.labelling import LabellingModel
from app.models.note import NoteModel
from app.utils.model import model_to_dict
from flask import request, jsonify
from flask.ext.restful import Resource
from werkzeug.exceptions import NotFound, BadRequest


@api_root.resource('/api/notes')
class APINotes(Resource):
    def get(self):
        if 'label' not in request.args or request.args['label'].lower() == 'all':
            notes = NoteModel.query.filter(NoteModel.user_id == 1).order_by(NoteModel.updated_date.desc()).all()
            notes = [model_to_dict(item) for item in notes]
            note_ids = [item['id'] for item in notes]
        else:
            note_ids = db.session.query(LabellingModel.note_id.label('id')). \
                join(LabelModel). \
                filter(LabellingModel.user_id == 1). \
                filter(LabelModel.title == request.args['label']). \
                all()
            note_ids = [int(item.id) for item in note_ids]
            notes = NoteModel.query.filter(NoteModel.id.in_(note_ids)).order_by(NoteModel.updated_date.desc()).all()
            notes = [model_to_dict(item) for item in notes]

        if len(notes) == 0:
            raise NotFound

        labellings = db.session.query(LabelModel, LabellingModel). \
            join(LabellingModel, LabelModel.id == LabellingModel.label_id). \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.note_id.in_(note_ids)). \
            all()
        for note in notes:
            note['labels'] = [{
                'id': item.LabelModel.id,
                'title': item.LabelModel.title
            } for item in labellings if item.LabellingModel.note_id == note['id']]

        return jsonify({
            'items': notes
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

        return self.get()