from flask import jsonify, request, make_response
from flask_restful import reqparse, abort, Api, Resource
from database.models.profile import Profile
from database.models.user import User
from database.db import db
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from config import IMAGE_URL_PATH
import datetime
import os

parser = reqparse.RequestParser()
parser.add_argument("search")
parser.add_argument("profile_img", type=FileStorage, location="files")
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
            print(user_id)
            profiles = db.session.query(Profile).filter_by(user_id=user_id)
        # 검색 쿼리스트링이 없고, user_id 값이 주어지지 않으면 모든 profile return, 200
        else:
            profiles = db.session.query(Profile).all()

        # 데이터가 없는 초기의 경우에는 빈 배열만 return, 200
        if not profiles:
            return abort(400, status="fail", profiles=[], message="검색 결과가 없습니다.")

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
            profiles=result,
        )

    # 회원가입으로 회원을 생성할때 profile은 자동생성되므로 post 연산은 작성하지 않는다.
    def post(self, user_id):
        pass

    @jwt_required()
    def put(self, user_id):
        if get_jwt_identity() != int(user_id):
            abort(401, status="fail", msg="접근 권한이 없습니다.")

        print(request.get_json())
        try:
            # 프로필의 이름, 코멘트 정보를 request에 보낸 경우
            # 해당 정보를 update 하고 response에 변경 내용을 보내준다.
            user_name, comment = dict(request.get_json(force=True)).values()
            print(user_name, comment)
            db.session.query(Profile).filter_by(user_id=user_id).update(
                {
                    "user_name": user_name,
                    "comment": comment,
                }
            )
            print("profile 수행 완료")
            db.session.query(User).filter_by(id=user_id).update({"fullname": user_name})
            print("user 수정 완료")
            db.session.commit()
            return jsonify(
                status="success",
                result={"user_name": user_name, "comment": comment},
            )
        except:
            # 만약 이름, 코멘트 정보가 주어지지 않았다면
            # 이미지 파일이 주어졌는지 확인한다.
            try:
                # 사진 파일 객체를 받음
                profile_img = request.files["file"]
                print("profile 사진 파일 변수 받음", type(profile_img))

                # 사진 파일 경로 암호화
                fname = secure_filename(profile_img.filename)
                print(f"파일 암호화 {fname}")

                # 해당 사용자의 프로필 사진이 이미 등록되어 있다면 삭제하고 해당 사진 업로드
                profile = db.session.query(Profile).filter_by(user_id=user_id).first()
                db.session.commit()
                print(f"해당 id에 현재 img url값 질의하기 {profile.img_url}")
                url = profile.img_url.split("/")[-1]
                print(f"static/{url.split('/')[-1]}")

                if os.path.isfile(f"static/{user_id}/{url.split('/')[-1]}"):
                    os.remove(f"static/{user_id}/{url.split('/')[-1]}")
                print("해당 유저 폴더에 이미 사진이 있으면 삭제")

                # 각 유저의 사진을 저장할 디렉토리 생성(이미 있으면 생성하지 않는다.)
                os.makedirs(f"static/{user_id}", exist_ok=True)
                print("디렉토리 생성")

                # 만들어진 디렉토리에 현재 파일 저장
                profile_img.save(os.path.join(f"static/{user_id}", fname))
                print("디렉토리에 현재 파일 저장")
                db.session.query(Profile).filter_by(user_id=user_id).update(
                    {"img_url": f"{IMAGE_URL_PATH}/{user_id}/{fname}"}
                )
                print("db에 변동사항 저장")
                db.session.commit()
                return jsonify(
                    status="success",
                    result={"img_url": f"{IMAGE_URL_PATH}/{user_id}/{fname}"},
                )
            except:
                # 이미지 파일도 request에 오지 않았다면 잘못된 요청이므로 400으로 에러 response 400
                return make_response(jsonify(message="잘못된 요청입니다."), 400)

    # 프로필 정보는 삭제하지 않기 때문에 작성하지 않습니다.
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
