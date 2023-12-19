from flask import Blueprint, request, jsonify
from models.contact import Contact
from app import db

contact_bp = Blueprint('contact_bp', __name__)

@contact_bp.route('/submitcontact', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if name and email and message:
            new_contact = Contact(name=name, email=email, message=message)
            db.session.add(new_contact)
            db.session.commit()
            return jsonify({'message': 'Form data saved successfully'}), 200
        else:
            return jsonify({'error': 'Incomplete form data'}), 400


