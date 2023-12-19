from app import db
# Properties Model
class Property(db.Model):

    __tablename__ = "Property"
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.String(50), unique=True)
    json_data = db.Column(db.JSON)