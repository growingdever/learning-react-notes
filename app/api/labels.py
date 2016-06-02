from app import api_root, db
from app.models.label import LabelModel
from app.utils.model import model_to_dict
from flask import request, jsonify
from flask.ext.restful import Resource
from werkzeug.exceptions import BadRequest


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

        return jsonify({
            'items': [model_to_dict(item) for item in LabelModel.query.all()]
        })
