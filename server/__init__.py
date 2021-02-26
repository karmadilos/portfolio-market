import os
import config
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import (
    JWTManager,
    get_jwt_identity,
    get_jwt,
    create_access_token,
    set_access_cookies,
    set_access_cookies,
)
from datetime import datetime, timedelta, timezone
from database.db import db

migrate = Migrate()

# auth blueprint 객체
from resources.auth import auth


def create_app():
    # Flask 객체 app 생성 및 config 변수 적용
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=os.getenv("ORIGIN"))
    # app object에 config 적용
    app.config.from_object(config)
    # jwt 적용을 위한 JMTManager 적용
    jwt = JWTManager(app)
    # auth 객체 blueprint 등록
    app.register_blueprint(auth, url_prefix="/auth")
    # api 설정 및 적용
    api = Api(app)
    # db 적용 및 migrate
    db.init_app(app)
    db.create_all(app=app)
    migrate.init_app(app, db)

    # JWT 암시적 로그인 연장을 위한 코드
    # app에 대한 모든 HTTP request 요청 실행 후 refresh
    # 여부를 확인하고 refresh 한다.
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            # 현재 accessToken의 expire time이 30분 미만 남았을 때
            # accessToken을 refresh 시켜준다.
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            # 유효한 Access Token이 아닐 때는 기존 response를 그대로 보낸다.
            return response

    return app
