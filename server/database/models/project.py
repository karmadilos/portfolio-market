import datetime
from database.db import db
from .user import User


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"))
    title = db.Column(db.String(50), nullable=False)
    desc = db.Column(db.String(100))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self,
        user_id,
        title="",
        start_date=datetime.datetime.utcnow(),
        end_date=datetime.datetime.utcnow(),
        desc="",
    ):
        self.user_id = user_id
        self.title = title
        self.desc = desc
        self.start_date = start_date
        self.end_date = end_date
