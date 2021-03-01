import datetime
from database.db import db
from .user import User


class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="SET NULL"))
    title = db.Column(db.String(50), nullable=False)
    organization = db.Column(db.String(50), nullable=False)
    acquisition_date = db.Column(db.DateTime, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self,
        user_id,
        title="",
        organization="",
        acquisition_date=datetime.datetime.utcnow(),
    ):
        self.user_id = user_id
        self.title = title
        self.organization = organization
        self.acquisition_date = acquisition_date
