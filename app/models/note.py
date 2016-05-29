import datetime

from app import db


class NoteModel(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user_model.id'),
        nullable=False
    )
    title = db.Column(
        db.String(80)
    )
    content = db.Column(
        db.TEXT
    )
    created_date = db.Column(
        db.TIMESTAMP,
        default=datetime.datetime.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP')
    )
    updated_date = db.Column(
        db.TIMESTAMP,
        default=datetime.datetime.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    )
