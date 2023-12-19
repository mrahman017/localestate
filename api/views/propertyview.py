from flask import Blueprint, request, jsonify
from models.property import Property
from app import db

property_bp = Blueprint('property_bp', __name__)

# Endpoint to receive and store property data
@property_bp.route('/saveproperty', methods=['POST'])
def save_property():
    data = request.json  # Assuming your frontend sends JSON data
    
    property_results = data.get('data', {})

    for property_item in property_results:
        propertyid = property_item['property_id']
        jsondata = property_item  # Save the entire property data as JSON
        
        # Check if the property already exists in the database
        existing_property = Property.query.filter_by(property_id=propertyid).first()
        if existing_property:
            existing_property.json_data = jsondata
        else:
            new_property = Property(property_id=propertyid, json_data=jsondata)
            db.session.add(new_property)

    db.session.commit()
    return jsonify({'message': 'Properties saved successfully'})




    # route to get the listings

    # Endpoint to retrieve property listings from the database
# @app.route('/listings', methods=['GET'])
# def get_listings():
#     try:
#         # Fetch all properties from the database
#         properties = Property.query.all()

#         # Prepare the properties data to be sent as JSON
#         property_listings = []
#         for prop in properties:
#             property_data = {
#                 'property_id': prop.property_id,
#                 'json_data': prop.json_data  # Adjust this as per your Property model structure
#             }
#             property_listings.append(property_data)

#         return jsonify({'listings': property_listings})
#     except Exception as e:
#         return jsonify({'error': str(e)})