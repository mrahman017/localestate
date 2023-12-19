from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, url_for, redirect
import os
from flask_cors import CORS

#from database import db

app = Flask(__name__)

CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# SQLite configuration

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'easy_estate_database.db')
print("sqlite:///" + os.path.join(basedir, 'easy_estate_database.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'

db = SQLAlchemy(app)


# contact page submit form post request to the datbase
from views.contactview import contact_bp
# Register blueprint for contact routes
app.register_blueprint(contact_bp)



# properties to the database
from views.propertyview import property_bp
# Register blueprint for contact routes
app.register_blueprint(property_bp)


#  user to the database
from views.userview import user_bp
# Register blueprint for contact routes
app.register_blueprint(user_bp)



#  favorite to the database
from views.favoritesview import favorite_bp
# Register blueprint for contact routes
app.register_blueprint(favorite_bp)



with app.app_context():
    db.create_all()


if __name__ == '__main__':
    
    app.run(debug=True)  # Run the Flask app
