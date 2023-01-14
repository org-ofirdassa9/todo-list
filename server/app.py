from flask import Flask, render_template, request, redirect, flash, jsonify
from flask_cors import CORS
import bcrypt
import os
import sql_commands
import mongo_commands


sql = sql_commands.Db_Commands()
app = Flask(__name__)
app.secret_key = os.environ['APP_SECRET_KEY']
CORS(app, origins=["http://localhost:3000"])

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
#     return response

@app.route('/gettasks', methods=['GET'])
def gettasks():
    user = sql.get_user('aa@aa')
    if user is None:
        return {"tasks": []}
    return mongo_commands.get_tasks()

@app.route('/users/<email>', methods=['GET', 'DELETE'])
def users(email):
    if request.method == 'GET':
        user = sql.get_user(email)
        print(user)
        if user is None:
            return "User not found"
        return {"user": user.__dict__}
    elif request.method == 'DELETE':
        ####TBD####
        pass

@app.route('/addtask', methods=['POST'])
def addtask():
    data = request.get_json()
    print(data)
    description = data['data']['task']
    if not description:
        return {'status_code': 200, 'message': 'Task is required!'}
    return mongo_commands.add_task(description)
        
@app.route('/deletetask', methods=['DELETE'])
def deletetask():
    try:
        task_id = request.args.get('tid')
        return mongo_commands.delete_task(task_id)
    except Exception as e:
        return {'status_code': 200, 'message': e}

@app.route('/updatetaskstatus', methods=['PUT'])
def updatetask():
    data = request.get_json()
    task = data['data']
    return mongo_commands.update_task_status(task)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not all(data[key] for key in data):
        return {'status_code': 200, 'message': 'Please make sure all field are filled'}
    email = data['email']
    password = data['password']
    first_name = data['firstname']
    last_name = data['lastname']
    # hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        result = sql.create_user(email,hashed_password,first_name,last_name)
        return {'status_code': 200, 'message': result}
    except Exception as e:
        return {'status_code': 200, 'message': e}


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data["email"]
    if not email:
        return {'status_code': 200, 'message': 'No email was supplied!'}
    password = data["password"]
    result = sql.get_password(email)
    if not result:
        return {'status_code': 200, 'message': f"Didn't found a user {email}"}
    hashed_password = result.decode().rstrip("\x00").encode()
    # Check if the password matches the one provided by the user
    if hashed_password is not None:
        # Fetch the hashed password from the result
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            # password is correct, redirect to welcome page
            return {'status_code': 200, 'message': 'Welcome!'}
        else:
            # password is incorrect, return an error message
            return {'status_code': 200, 'message': 'Wrong password!'}
    else:
        # user does not exist, return an error message
        return {'status_code': 200, 'message': 'User Does not exist!'}

if __name__ == '__main__':
    app.run()