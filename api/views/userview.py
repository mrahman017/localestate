from flask import Blueprint, request, jsonify
from models.user import User
from app import db

user_bp = Blueprint('user_bp', __name__)

# save user enpoint
@user_bp.route('/saveuser', methods=['POST'])
def save_user():
    data = request.json

    # Extract user details from the JSON request
    firebaseuid = data.get('firebaseuid')
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    email = data.get('email')

    # Create a new user instance
    new_user = User(
        firebaseuid=firebaseuid,
        firstname=firstname,
        lastname=lastname,
        email=email,
    )

    # Add the user to the database session and commit changes
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User saved successfully'})




# get user enpoint

@user_bp.route('/getuser', methods=['GET'])
def get_user():
    firebaseuid = request.args.get('firebaseuid')

    # Find the user in the database based on firebaseuid
    user = User.query.filter_by(firebaseuid=firebaseuid).first()

    if user:
        # Prepare the user details to return as JSON
        user_data = {
            'firebaseuid': user.firebaseuid,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email,
        }
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'})


