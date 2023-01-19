from flask import Blueprint, request
import mongo_commands
import sql_commands


sql = sql_commands.Db_Commands()

tasks = Blueprint('tasks', __name__)
@tasks.route('/gettasks', methods=['GET'])
def gettasks():
    user = sql.get_user_by_email('aa@aa')
    if user is None:
        return {"tasks": []}
    return mongo_commands.get_tasks()

@tasks.route('/addtask', methods=['POST'])
def addtask():
    data = request.get_json()
    print(data)
    description = data['data']['description']
    if not description:
        return {'status_code': 200, 'message': 'Task is required!'}
    return mongo_commands.add_task(description)

@tasks.route('/deletetask', methods=['DELETE'])
def deletetask():
    try:
        task_id = request.args.get('tid')
        return mongo_commands.delete_task(task_id)
    except Exception as e:
        return {'status_code': 200, 'message': e}

@tasks.route('/updatetaskstatus', methods=['PUT'])
def updatetask():
    data = request.get_json()
    tid = data['params']['tid']
    return mongo_commands.update_task_status(tid)