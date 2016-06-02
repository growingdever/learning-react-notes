from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

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


from app.api.notes import APINotes
from app.api.note import APINote
from app.api.labels import APILabels
from app.api.label import APILabel
