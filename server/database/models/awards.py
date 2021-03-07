import datetime
from database.db import db
from .user import User


class Awards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"))
    award_title = db.Column(db.String(50), nullable=False)
    award_desc = db.Column(db.String(400))
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, user_id, award_title="", award_desc=""):
        self.user_id = user_id
        self.award_title = award_title
        self.award_desc = award_desc
