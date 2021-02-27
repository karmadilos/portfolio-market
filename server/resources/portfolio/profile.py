from flask import jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from database.models.profile import Profile
from database.db import db
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from config import IMAGE_URL_PATH
import datetime

parser = reqparse.RequestParser()
parser.add_argument("search")

# 토큰 방식으로 구현 후, post/put/delete 작업은
# 토큰 검증방식을 거친 후 접근할 수 있도록 처리하는 것 필요
class ProfileApi(Resource):
    def get(self, user_id=None):
        search = parser.parse_args().search
        q = f"%{search}%"
        # 검색 쿼리스트링이 주어지는 경우에는 해당하는 데이터 모두 return, 200
        if search:
            profiles = db.session.query(Profile).filter(Profile.user_name.like(q)).all()
        # 검색 쿼리스트링이 없고, user_id 값이 주어지면 해당하는 profile return, 200
        elif user_id:
            profiles = db.session.query(Profile).filter_by(user_id=user_id).first()
        # 검색 쿼리스트링이 없고, user_id 값이 주어지지 않으면 모든 profile return, 200
        else:
            profiles = db.session.query(Profile).all()

        # 데이터가 없는 초기의 경우에는 빈 배열만 return, 200
        if not profiles:
            return jsonify(status="success", data=[])

        keys = [
            "id",
            "user_id",
            "user_name",
            "comment",
            "img_url",
            "create_date",
            "updated_date",
        ]
        result = [{key: getattr(v, key) for key in keys} for v in profiles]
        return jsonify(
            status="success",
            data=result,
        )

    # 회원가입으로 회원을 생성할때 profile은 자동생성되므로 post 연산은 작성하지 않는다.
    # def post(self, user_id):
    #     if not user_id:
    #         abort(401, status="fail", msg="접근 권한이 없습니다.")
    #     comment, img = request["comment"], request.form["file"]
    #     education = Education(user_id, comment, img)
    #     db.session.add(education)
    #     db.session.commit()
    #     return jsonify(
    #         status="success",
    #         result={"_id": education.id},
    #     )

    def put(self, user_id):
        if not user_id:
            abort(401, status="fail", msg="접근 권한이 없습니다.")
        comment, img = request["comment"], request.form["file"]
        fname = secure_filename(img.filename)
        img.save("../../public/images/", fname)
        db.session.query(Profile).filter_by(user_id=user_id).update(
            comment=comment, img_url=f"{IMAGE_URL_PATH}fname"
        )
        db.session.commit()
        return jsonify(
            status="success",
            result={"_id": user_id},
        )

    def delete(self, user_id):
        if not user_id:
            abort(401, status="fail", msg="접근 권한이 없습니다.")
        if not id:
            abort(400, status="fail", msg="삭제할 데이터가 없습니다.")

        profile = Profile.query.filter_by(user_id=user_id).first()

        # 해당 프로필 정보가 존재하지 않으면 response 400
        if not profile:
            abort(400, status="fail", message="잘못된 ID입니다.")

        # 삭제할 프로필 정보가 존재하면 삭제 후 response 200
        db.session.delete(profile)
        db.session.commit()
        return jsonify(
            status="success",
            result={
                "_id": user_id,
            },
        )
