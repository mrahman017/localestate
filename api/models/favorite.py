from app import db

class Favorite(db.Model):
    __tablename__ = 'Favorites'

    id = db.Column(db.Integer, primary_key=True)
    firebaseuid = db.Column(db.String(100))
    favorite_property = db.Column(db.JSON)