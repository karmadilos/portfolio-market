import os
import re
from flask import jsonify, request, Blueprint, session
from flask_restful import abort
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from database.models.user import User
from database.models.profile import Profile
from database.models.education import Education
from database.models.project import Project
from database.models.awards import Awards
from database.models.certificate import Certificate
from database.db import db

auth = Blueprint("auth", __name__)
jwt = JWTManager()

email_pattern = re.compile("[\w]*[.]?[\w]+@[\w][.]?[\w]+[.][\w]+")
password_pattern = re.compile("([\w+\W+]){8,}")
name_pattern = re.compile("[\d\W]")


@auth.route("/register", methods=["POST"])
def register():
    email, password, fullname = dict(request.get_json(force=True)).values()
    # print(email, password, fullname)
    if email == "" or password == "" or fullname == "":
        abort(400, msg="이메일, 패스워드, 이름은 NULL일 수 없습니다.")
    elif not email_pattern.match(email):
        abort(400, msg="이메일 형식이 올바르지 않습니다.")
    elif not password_pattern.match(password):
        abort(400, msg="비밀번호 형식이 올바르지 않습니다.")
    elif name_pattern.match(fullname):
        abort(400, msg="이름에 특수문자나 숫자가 포함될 수 없습니다.")
    elif User.query.filter_by(email=email).first():
        return jsonify(status="fail", msg=f"{email}는 이미 등록된 계정입니다."), 400

    user = User(email, password, fullname)
    db.session.add(user)
    db.session.commit()

    profile = Profile(user.id, user.fullname)
    db.session.add(profile)
    db.session.commit()

    education = Education(user.id)
    db.session.add(education)
    db.session.commit()

    awards = Awards(user.id)
    db.session.add(awards)
    db.session.commit()

    project = Project(user.id)
    db.session.add(project)
    db.session.commit()

    certificate = Certificate(user.id)
    db.session.add(certificate)
    db.session.commit()
    return jsonify(status="success", message=f"Successfully Registered: {email}")


@auth.route("/login", methods=["POST"])
def login():
    print(request)
    try:
        email, password = dict(request.get_json(force=True)).values()
        print(email, password)
    except:
        abort(400, msg="잘못된 request입니다.")
    if not email_pattern.match(email):
        abort(400, msg="이메일 형식이 올바르지 않습니다.")
    elif not password_pattern.match(password):
        abort(400, msg="비밀번호 형식이 올바르지 않습니다.")
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        abort(400, status="fail", msg="아이디 또는 비밀번호를 확인하세요.")

    response = jsonify(
        status="success", user={"id": user.id, "fullname": user.fullname}
    )
    access_token = create_access_token(identity=user.id)
    set_access_cookies(response, access_token)
    return response


@auth.route("/logout", methods=["POST"])
def logout():
    response = jsonify(status="success")
    # accessToken Cookie를 삭제한다.
    unset_jwt_cookies(response)
    return response


@auth.route("/user", methods=["POST"])
@jwt_required()
def get_user():
    from flask_jwt_extended.config import config

    print(config.access_cookie_name, config.header_name)
    print(request.cookies, request.headers)
    identity = get_jwt_identity()
    print(identity)
    if not identity:
        jsonify(status="fail", msg="로그인이 필요합니다."), 401
    user = db.session.query(User).filter_by(id=identity).first()
    return jsonify(status="success", user={"id": identity, "fullname": user.fullname})
