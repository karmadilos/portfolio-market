import os
import datetime
from database.db import db
from .user import User


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"))
    user_name = db.Column(db.String(30))
    img_url = db.Column(db.String(2048))
    comment = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self, user_id, user_name, img_url=os.getenv("DEFAULT_IMAGE"), comment=""
    ):
        self.user_id = user_id
        self.user_name = user_name
        self.comment = comment
        self.img_url = img_url