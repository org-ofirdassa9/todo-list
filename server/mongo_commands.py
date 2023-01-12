import os
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient(os.environ['MONGO_TODO_CONN'])
db = client['todolist']
tasks_collection = db['tasks']

def add_task(description):
    tasks_list = {'description': description, 'completed': False}
    tasks_collection.insert_one(tasks_list)
    return tasks_list

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
    tasks_collection.delete_one({'_id': ObjectId(tid)})

def update_task(tid):
    try:
        completed = tasks_collection.find_one({"_id":  ObjectId(tid)})['completed'] 
        if completed:
            print('was True')
            tasks_collection.update_one({"_id": ObjectId(tid)}, {"$set": {"completed": False}})
            return {'200': 'OK'}
        print('was False')
        tasks_collection.update_one({"_id": ObjectId(tid)}, {"$set": {"completed": True}})
        return {'200': 'OK'}
    except Exception as e:
        print(e)
        return {'404': 'Not Found'}