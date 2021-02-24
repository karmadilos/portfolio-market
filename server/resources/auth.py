from flask import jsonify, request, Blueprint, session
from flask_restful import abort
from datetime import timedelta
from database.models.user import User
from database.db import db
import jwt

"""
User APIs : 유저 SignUp / Login / Logout

SignUp API : *fullname*, *email*, *password* 을 입력받아 새로운 유저를 가입시킵니다.
Login API : *email*, *password* 를 입력받아 특정 유저로 로그인합니다.
Logout API : 현재 로그인 된 유저를 로그아웃합니다.
"""

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def sign_up():
    email, password, fullname = dict(request.get_json(force=True)).values()
    # print(email, password, fullname)
    if email == "" or password == "" or fullname == "":
        abort(400, message="email, password, or fullname is null.")
    elif User.query.filter_by(email=email).first():
        abort(400, message=f"{email} has already been registered.")

    user = User(email, password, fullname)
    db.session.add(user)
    db.session.commit()

    return jsonify(status="success", message=f"Successfully Registered: {email}")


@auth.route("/login", methods=["POST"])
def login():
    email, password = dict(request.get_json(force=True)).values()
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return (
            jsonify(status="fail", message="Invalid email or password."),
            400,
        )

    # session.clear()
    user_id = session.get("user_id")
    # 기존에 로그인한 계정이 있다면
    if user_id:
        return (
            jsonify(
                status="fail",
                message="Invalid access: already logined",
            ),
            401,
        )
    session["user_id"] = email

    return jsonify(status="success", session=session.get("user_id"))


@auth.route("/logout")
def logout():
    user_id = session.get("user_id")
    print(user_id)
    # 기존에 로그인한 계정이 없다면
    if not user_id:
        return (
            jsonify(
                status="fail",
                message="Invalid access: there is no account to log out.",
            ),
            401,
        )
    session.pop("user_id", None)
    return jsonify(status="success")


@auth.route("/check")
def auth_check():
    _id = request.cookies.get("session")
    if "user_id" not in session:
        return jsonify(status="failure", Auth=False)
    return jsonify(status="success", Auth=True)


# @auth.before_request
# def set_session_permanent():
#     session.permanent = True
#     auth.permanent_session_lifetime = timedelta(minutes=5)
