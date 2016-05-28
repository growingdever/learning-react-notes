import arrow
from app import db


class LabellingModel(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user_model.id'),
        nullable=False
    )
    label_id = db.Column(
        db.Integer,
        db.ForeignKey('label_model.id'),
        nullable=False
    )
    note_id = db.Column(
        db.Integer,
        db.ForeignKey('note_model.id'),
        nullable=False
    )
    created_date = db.Column(
        db.TIMESTAMP,
        default=arrow.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP')
    )
