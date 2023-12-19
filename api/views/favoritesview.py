from flask import Blueprint, request, jsonify
from models.favorite import Favorite
from app import db

favorite_bp = Blueprint('favorite_bp', __name__)

# Endpoint to get favorite listings for a user
@favorite_bp.route('/getfavorites', methods=['GET'])
def get_favorites(firebaseuid):

    firebaseuid = request.args.get('firebaseuid')
    # Retrieve favorite listings based on firebaseuid
    favorites = Favorite.query.filter_by(firebaseuid=firebaseuid).all()

    if favorites:
        # If favorites exist, return the list of favorite properties
        favorite_properties = [fav.favorite_property for fav in favorites]
        return jsonify({'favorites': favorite_properties})
    else:
        # If no favorites found, return an empty list
        return jsonify({'favorites': []})



# Endpoint to add a new favorite listing for a user
@favorite_bp.route('/addfavorite', methods=['POST'])
def add_favorite():
    data = request.json

    # Extract firebaseuid and favorite property details from JSON request
    firebaseuid = data.get('firebaseuid')
    new_favorite = data.get('property')

    # Create a new entry for the favorite property associated with the firebaseuid
    favorite = Favorite(firebaseuid=firebaseuid, favorite_property=new_favorite)

    # Add the new favorite property to the database
    db.session.add(favorite)
    db.session.commit()


    return jsonify({'message': 'Favorite added successfully'})
