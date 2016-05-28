import arrow
from app import db


class UserModel(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    username = db.Column(
        db.String(80),
        unique=True
    )
    email = db.Column(
        db.String(120),
        unique=True
    )
    created_date = db.Column(
        db.TIMESTAMP,
        default=arrow.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP')
    )
    updated_date = db.Column(
        db.TIMESTAMP,
        default=arrow.utcnow,
        server_default=db.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    )
