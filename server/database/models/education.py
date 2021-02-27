import datetime
from database.db import db
from .user import User


class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="SET NULL"))
    school_name = db.Column(db.String(100), nullable=False)
    major = db.Column(db.String(50))
    status = db.Column(db.String(20), nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, user_id, school_name=None, major=None, status=None):
        self.user_id = user_id
        self.school_name = school_name
        self.major = major
        self.status = status
