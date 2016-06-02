from app import api_root, db
from app.models.label import LabelModel
from app.models.labelling import LabellingModel
from app.utils.model import model_to_dict
from flask import request, jsonify
from flask.ext.restful import Resource
from werkzeug.exceptions import NotFound, BadRequest


@api_root.resource('/api/labels/<int:label_id>')
class APILabel(Resource):
    def get(self, label_id):
        item = LabelModel.query. \
            filter(LabelModel.user_id == 1). \
            filter(LabelModel.id == label_id). \
            first()
        if item is None:
            raise NotFound

        return jsonify({
            'item': model_to_dict(item)
        })

    def put(self, label_id):
        data = request.get_json()
        if 'title' not in data:
            raise BadRequest

        item = LabelModel.query. \
            filter(LabelModel.user_id == 1). \
            filter(LabelModel.id == label_id). \
            first()
        if item is None:
            raise NotFound

        item.title = data['title']
        db.session.commit()

        return jsonify({
            'item': model_to_dict(item)
        })

    def delete(self, label_id):
        item = LabelModel.query. \
            filter(LabelModel.user_id == 1). \
            filter(LabelModel.id == label_id). \
            first()
        if item is None:
            raise NotFound

        labellings = LabellingModel.query. \
            filter(LabellingModel.user_id == 1). \
            filter(LabellingModel.label_id == label_id). \
            all()
        for item in labellings:
            db.session.delete(item)

        label = LabelModel.query.filter(LabelModel.user_id == 1).filter(LabelModel.id == label_id).first()
        db.session.delete(label)

        db.session.commit()

        return jsonify({
            'success': True
        })
