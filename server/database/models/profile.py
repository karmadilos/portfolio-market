import datetime
from database.db import db
from .user import User


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="SET NULL"))
    user_name = db.Column(
        db.String(30), db.ForeignKey("user.fullname", ondelete="SET NULL")
    )
    comment = db.Column(db.String(100))
    img_url = db.Column(db.String(2048))
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, user_id, user_name, comment=None, img_url=None):
        self.user_id = user_id
        self.user_name = user_name
        self.comment = comment
        self.img_url = img_url