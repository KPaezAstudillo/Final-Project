from flask import Blueprint, jsonify, request

from api.models import User, Trips, Rating, CreateTrip
# libreria para encriptar las contraseñas
# libreria para encriptar las contraseñas
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token

bpUser = Blueprint('bpUser', __name__)

# GET ENDPOINTS

# GET ALL USERS


@bpUser.route('/users', methods=['GET'])  # type: ignore
def all_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

# GET USER BY ID


@bpUser.route('/users/<int:id>', methods=['GET'])  # type: ignore
def user_by_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize()), 200

# GET ALL USERS AND THEIR TRIPS


@bpUser.route('/users/mytrips', methods=['GET'])  # type: ignore
def all_users_with_trips():
    users = User.query.all()
    users = list(map(lambda user: user.serialize_with_trips(), users))
    return jsonify(users), 200


@bpUser.route('/users/createtrips', methods=['GET'])  # type: ignore
def all_users_with_created_trips():
    users = User.query.all()
    users = list(map(lambda user: user.serialize_with_createdtrips(), users))
    return jsonify(users), 200

# GET USER AND TRIPS BY USER ID


@bpUser.route('/users/<int:id>/mytrips', methods=['GET'])  # type: ignore
def user_with_trips_with_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_trips()), 200

# GET USER AND TRIPS BY USER ID


@bpUser.route('/users/<int:id>/createtrips', methods=['GET'])  # type: ignore
def user_with_createdtrips_with_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_createdtrips()), 200

# GET USER RATES


@bpUser.route('/users/<int:id>/rating', methods=['GET'])  # type: ignore
def user_rating_with_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_rating()), 200


@bpUser.route('/users/<int:id>/activities', methods=['GET'])  # type: ignore
def user_activities_with_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_saved_activities()), 200


@bpUser.route('/users/<int:id>/matches', methods=['GET'])  # type: ignore
def user_matches_with_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_matches()), 200


# GET ALL USERS WITH TRIPS AND ACTIVITIES
# @bpUser.route('/users/mytrips/activities', methods=['GET'])  # type: ignore
# def all_users_with_trips_with_activities():
#     users= User.query.all()
#     users= list(map(lambda user: user.serialize_with_trips_with_activities(), users))
#     return jsonify(users), 200

# GET USER WITH TRIPS AND ACTIVITIES BY USER ID
# @bpUser.route('/users/<int:id>/mytrips/activities', methods=['GET'])  # type: ignore
# def user_with_trips_with_activities_with_id(id):
#     user= User.query.get(id)
#     return jsonify(user.serialize_with_trips_with_activities()), 200

# GET TRIP AND ACTIVITIES BY USER ID AND TRIP ID
# @bpUser.route('/users/<int:id>/mytrips/<int:mytrips_id>/activities', methods=['GET'])
# def get_trips_with_activities_by_user_id_and_trip_id(id, mytrips_id):
#     mytrips = Trips.query.filter_by(users_id=id, id=mytrips_id).first()
#     return jsonify(mytrips.serialize_with_activities()), 200

# POST ENDPOINTS

# POST NEW USER


@bpUser.route('/users', methods=['POST'])  # type: ignore
def store_user():
    id = request.json.get('id')
    firstname = request.json.get('firstname')  # type: ignore
    lastname = request.json.get('lastname')  # type: ignore
    birthdate = request.json.get('birthdate')  # type: ignore
    email = request.json.get('email')  # type: ignore
    password = request.json.get('password')  # type: ignore
    languages = request.json.get('languages')  # type: ignore
    gender = request.json.get('gender')  # type: ignore
    countryofresidence = request.json.get('countryofresidence')  # type: ignore
    instagram = request.json.get('instagram')  # type: ignore
    facebook = request.json.get('facebook')  # type: ignore
    twitter = request.json.get('twitter')  # type: ignore
    verified = request.json.get('verified')  # type: ignore

#####
    user = User()
    user.id = id
    user.firstname = firstname
    user.lastname = lastname
    user.birthdate = birthdate
    user.email = email
    user.password = generate_password_hash(password)
    user.languages = languages
    user.gender = gender
    user.countryofresidence = countryofresidence
    user.instagram = instagram
    user.facebook = facebook
    user.twitter = twitter
    user.verified = verified
    user.save()

    return jsonify(user.serialize()), 201

# POST NEW TRIP BY USER ID


@bpUser.route('/users/<int:id>/mytrips', methods=['POST'])
def store_mytrip_by_user_id(id):
    user = User.query.get(id)

    travelling = request.json.get('travelling')  # type: ignore
    with_children = request.json.get('with_children')  # type: ignore
    gender_specific = request.json.get('gender_specific')  # type: ignore
    stay = request.json.get('stay')  # type: ignore
    budget = request.json.get('budget')  # type: ignore
    activities = request.json.get('activities')  # type: ignore
    partner_age = request.json.get('partner_age')  # type: ignore
    users_id = request.json.get('users_id')  # type: ignore

    mytrips = Trips()
    mytrips.travelling = travelling
    mytrips.with_children = with_children
    mytrips.gender_specific = gender_specific
    mytrips.stay = stay
    mytrips.budget = budget
    mytrips.activities = activities
    mytrips.partner_age = partner_age
    mytrips.users_id = users_id
    user.mytrips.append(mytrips)
    user.update()

    return jsonify(user.serialize_with_trips()), 200

    # POST NEW TRIP DATES AND PLACE BY USER ID


@bpUser.route('/users/<int:id>/create', methods=['POST'])
def create_trip_by_user_id(id):
    user = User.query.get(id)

    country_trip = request.json.get('country_trip')
    capital_trip = request.json.get('capital_trip')
    start_date = request.json.get('start_date')
    end_date = request.json.get('end_date')
    users_id = request.json.get('users_id')

    createtrips = CreateTrip()
    createtrips.country_trip = country_trip
    createtrips.capital_trip = capital_trip
    createtrips.start_date = start_date
    createtrips.end_date = end_date
    createtrips.users_id = users_id
    user.createtrips.append(createtrips)
    user.update()

    return jsonify(user.serialize_with_createdtrips()), 200

# POST USER RATING BY USER ID


@bpUser.route('/users/<int:id>/rating', methods=['POST'])
def store_rating_by_user_id(id):
    user = User.query.get(id)

    good_match = request.json.get('good_match')
    recommend = request.json.get('recommend')
    reason_good = request.json.get('reason_good')
    reason_bad = request.json.get('reason_bad')
    experience = request.json.get('experience')
    users_id = request.json.get('users_id')

    rating = Rating()
    rating.good_match = good_match
    rating.recommend = recommend
    rating.reason_good = reason_good
    rating.reason_bad = reason_bad
    rating.experience = experience
    rating.users_id = users_id
    user.rating.append(rating)
    user.update()

    return jsonify(user.serialize_with_rating()), 200


# POST NEW ACTIVITY BY USER ID AND TRIP ID
# @bpUser.route('/users/<int:id>/mytrips/<int:mytrips_id>/activities', methods=['POST'])  # type: ignore
# def store_activities_by_trip_by_user_id(id, mytrips_id):
#     mytrips = Trips.query.filter_by(users_id=id, id=mytrips_id).first()

#     trekking = request.json.get('trekking') # type: ignore
#     gastronomy = request.json.get('gastronomy') # type: ignore
#     cultural = request.json.get('cultural') # type: ignore
#     nightlife = request.json.get('nightlife') # type: ignore
#     shopping = request.json.get('shopping') # type: ignore
#     trips_id = request.json.get('trips_id') # type: ignore

#     activities = Activities()
#     activities.trekking = trekking
#     activities.gastronomy = gastronomy
#     activities.cultural = cultural
#     activities.nightlife = nightlife
#     activities.shopping = shopping
#     activities.trips_id = trips_id
#     mytrips.activities.append(activities)
#     mytrips.update()

#     return jsonify(mytrips.serialize_with_activities()), 200

# PUT ENDPOINTS

# UPDATE USER BY ID
@bpUser.route('/users/<int:id>/update', methods=['PUT'])
def update_user(id):

    firstname = request.json.get('firstname')  # type: ignore
    lastname = request.json.get('lastname')  # type: ignore
    birthdate = request.json.get('birthdate')  # type: ignore
    email = request.json.get('email')  # type: ignore
    password = request.json.get('password')  # type: ignore
    verified = request.json.get('verified')  # type: ignore

    user = User.query.get(id)
    user.firstname = firstname
    user.lastname = lastname
    user.birthdate = birthdate
    user.email = email
    user.password = password
    user.verified = verified

    user.save()
    return jsonify(user.serialize()), 200

# UPDATE TRIPS BY USER ID AND TRIP ID


@bpUser.route('/users/<int:id>/mytrips/<int:mytrips_id>/update', methods=['PUT'])
def update_mytrip_by_user_id_and_trip_id(id, mytrips_id):
    mytrips = Trips.query.filter_by(users_id=id, id=mytrips_id).first()

    travelling = request.json.get('travelling')  # type: ignore
    with_children = request.json.get('with_children')  # type: ignore
    gender_specific = request.json.get('gender_specific')  # type: ignore
    stay = request.json.get('stay')  # type: ignore
    budget = request.json.get('budget')  # type: ignore
    activities = request.json.get('activities')
    partner_age = request.json.get('partner_age')  # type: ignore
    users_id = request.json.get('users_id')  # type: ignore

    mytrips = Trips.query.get(mytrips_id)
    mytrips.travelling = travelling
    mytrips.with_children = with_children
    mytrips.gender_specific = gender_specific
    mytrips.stay = stay
    mytrips.budget = budget
    mytrips.activities = activities
    mytrips.partner_age = partner_age
    mytrips.users_id = users_id

    mytrips.save()
    return jsonify(mytrips.serialize_with_activities()), 200


#     trekking = request.json.get('trekking') # type: ignore
#     gastronomy = request.json.get('gastronomy') # type: ignore
#     cultural = request.json.get('cultural') # type: ignore
#     nightlife = request.json.get('nightlife') # type: ignore
#     shopping = request.json.get('shopping') # type: ignore
#     trips_id = request.json.get('trips_id') # type: ignore

#     activity = Activities.query.get(act_id)
#     activity.trekking = trekking
#     activity.gastronomy = gastronomy
#     activity.cultural = cultural
#     activity.nightlife = nightlife
#     activity.shopping = shopping
#     activity.trips_id = trips_id


@bpUser.route('/user/<int:id>/delete', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    user.delete()
    return jsonify({"message": "user deleted"}), 200