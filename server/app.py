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
    user = sql.get_user('aa@aaa')
    if user is None:
        return mongo_commands.get_tasks()
    return jsonify({"user": user.format_user()})

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

@app.route('/addtask/<description>', methods=['POST'])
def addtask(description):
    if not description:
        flash('Error: Task title is required')
    else:
        mongo_commands.add_task(description)
    return redirect('http://localhost:3000')

@app.route('/deletetask/<task_id>', methods=['DELETE'])
def deletetask(task_id):
    mongo_commands.delete_task(task_id)
    return redirect('http://localhost:3000')

@app.route('/updatetask/<task_id>', methods=['PUT'])
def updatetask(task_id):
    try:
        mongo_commands.update_task(task_id)
        return {'200': 'OK'}
    except Exception as e:
        return {'404': f'Not Found {e}'}

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        # hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        print(f'password {password}, hashedpassword {hashed_password}')
        sql.create_user(email,hashed_password,first_name,last_name)
        return redirect('/signupsuccess')
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        result = sql.get_password(email)
        hashed_password = result.decode().rstrip("\x00").encode()
        # Check if the password matches the one provided by the user
        if hashed_password is not None:
            # Fetch the hashed password from the result
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                # password is correct, redirect to welcome page
                return redirect('/welcome')
            else:
                # password is incorrect, return an error message
                return "Incorrect password"
        else:
            # user does not exist, return an error message
            return "User does not exist"
    return render_template('login.html')

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@app.route('/signupsuccess')
def signupsuccess():
    return render_template('signupsuccess.html')


if __name__ == '__main__':
    app.run()