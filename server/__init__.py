import config
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from database.db import db

migrate = Migrate()

# auth bluepring 객체
from resources.auth import auth


def create_app():
    # Flask 객체 app 생성 및 config 변수 적용
    app = Flask(__name__)
    CORS(app)
    # app object에 config 적용
    app.config.from_object(config)
    # auth 객체 blueprint 등록
    app.register_blueprint(auth, url_prefix="/auth")
    # api 설정 및 적용
    api = Api(app)
    # db 적용 및 migrate
    db.init_app(app)
    db.create_all(app=app)
    migrate.init_app(app, db)

    # root 경로 임시 라우트
    @app.route("/")
    def index():
        return {"result": "success"}

    return app
