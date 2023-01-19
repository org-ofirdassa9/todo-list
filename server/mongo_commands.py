import os
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient(os.environ['MONGO_TODO_CONN'])
db = client['todolist']
tasks_collection = db['tasks']

def add_task(description):
    try:
        tasks_list = {'description': description, 'completed': False}
        tasks_collection.insert_one(tasks_list)
        tid = str(tasks_list['_id'])
        tasks_list['_id'] = tid
        return tasks_list
    except Exception as e:
        return {'status_code': 200, 'error_message': e}

def get_tasks():
    cursor = tasks_collection.find()
    tasks_list = []
    tasks_dict = {}
    for document in cursor:
        task = {}
        task['description'] = document['description']
        task['completed'] = document['completed']
        task['tid'] = str(document['_id'])
        tasks_list.append(task)
    tasks_dict['tasks'] = tasks_list
    return tasks_dict

def delete_task(tid):
    try:  
        tasks_collection.delete_one({'_id': ObjectId(tid)})
        return {'tid': tid} 
    except Exception as e:
        return {'404': 'Not Found'}


def update_task_status(tid):
    try:
        completed = tasks_collection.find_one({"_id":  ObjectId(tid)})['completed']
        if completed:
            tasks_collection.update_one({"_id": ObjectId(tid)}, {"$set": {"completed": False}})
            return {'tid': tid}
        tasks_collection.update_one({"_id": ObjectId(tid)}, {"$set": {"completed": True}})
        return {'tid': tid}
    except Exception as e:
        print(e)
        return {'404': 'Not Found'}