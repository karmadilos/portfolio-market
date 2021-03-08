from flask import jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from database.models.certificate import Certificate
from database.db import db
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import datetime
import maya

keys = [
    "id",
    "user_id",
    "title",
    "organization",
    "acquisition_date",
    "create_date",
    "updated_date",
]
# 토큰 방식으로 구현 후, post/put/delete 작업은
# 토큰 검증방식을 거친 후 접근할 수 있도록 처리하는 것 필요
class CertificateApi(Resource):
    def get(self, user_id, id=None):
        # id값이 주어지는 경우에는 하나의 데이터만 return, 200
        if not id:
            certificate = (
                db.session.query(Certificate)
                .filter_by(user_id=user_id)
                .order_by(Certificate.create_date)
                .all()
            )
        else:
            certificate = db.session.query(Certificate).filter_by(
                user_id=user_id, id=id
            )
        # 데이터가 없는 초기의 경우에는 빈 배열만 return, 200
        if not certificate:
            jsonify(status="success", data=[])

        result = [{key: getattr(v, key) for key in keys} for v in certificate]
        return jsonify(
            status="success",
            certificates=result,
        )

    @jwt_required()
    def post(self, user_id):
        if get_jwt_identity() != int(user_id):
            abort(401, status="fail", msg="접근 권한이 없습니다.")
        certificate = Certificate(user_id)
        db.session.add(certificate)
        db.session.commit()
        return jsonify(
            status="success",
            result={key: getattr(certificate, key) for key in keys},
        )

    @jwt_required()
    def put(self, user_id, id=None):
        if get_jwt_identity() != int(user_id):
            abort(401, status="fail", msg="접근 권한이 없습니다.")
        # 여러개의 데이터를 동시에 수정한다. (data에 배열로 수정 내용을 입력받음)
        data = request.get_json(force=True)
        # print(data["data"])
        for v in data:
            v["acquisition_date"] = maya.parse(' '.join(v["acquisition_date"].split()[:5])).datetime()
            v["create_date"] = maya.parse(' '.join(v["create_date"].split()[:5])).datetime()
            v["updated_date"] = datetime.datetime.utcnow()
            db.session.query(Certificate).filter_by(id=v["id"]).update(v)
        db.session.commit()
        return jsonify(
            status="success",
            result={"id": list(map(lambda x: x["id"], data))},
        )

    @jwt_required()
    def delete(self, user_id, id):
        if get_jwt_identity() != int(user_id):
            abort(401, status="fail", msg="접근 권한이 없습니다.")
        if not id:
            abort(400, status="fail", msg="삭제할 데이터가 없습니다.")

        certificate = Certificate.query.filter_by(user_id=user_id, id=id).first()

        # 해당 학위 정보가 존재하지 않으면 response 400
        if not certificate:
            abort(400, status="fail", message="잘못된 ID입니다.")

        # 삭제할 학위 정보가 존재하면 삭제 후 response 200
        db.session.delete(certificate)
        db.session.commit()
        return jsonify(
            status="success",
            result={
                "id": id,
            },
        )
