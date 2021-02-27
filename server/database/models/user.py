import datetime
from database.db import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    fullname = db.Column(db.String(30), nullable=False)
    register_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    profile = db.relationship("Profile", uselist=False, back_populates="parent")

    def __init__(self, email, password, fullname):
        self.email = email
        self.set_password(password)
        self.fullname = fullname

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
