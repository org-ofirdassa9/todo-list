import os
import pyodbc
from datetime import datetime
import User

class Db_Commands:
    def __init__(self):
        self.conn = pyodbc.connect(os.environ['SQL_CONN_STRING'])
        self.cursor = self.conn.cursor()
        
    def get_password(self, email):
        query = 'SELECT PasswordHash FROM dbo.Passwords WHERE UserID IN (SELECT UserID FROM dbo.Users WHERE Email = ?)'
        self.cursor.execute(query, email)
        return self.cursor.fetchone()[0]

    def create_user(self, email, hashed_password, first_name, last_name):
        query = 'INSERT INTO dbo.Users (Email, HasPassword, FirstName, LastName, CreatedAt) OUTPUT Inserted.UserID VALUES (?, 1, ?, ?, ?)'
        params = email, first_name, last_name, datetime.now().strftime("%m/%d/%Y %H:%M:%S")
        self.cursor.execute(query, params)
        inserted_user_id = self.cursor.fetchone()[0]
        query = 'INSERT INTO dbo.Passwords (UserId, PasswordHash) VALUES (?, ?)'
        params = inserted_user_id, hashed_password
        self.cursor.execute(query, params)
        self.cursor.commit()

    def get_user(self, email):
        query = 'SELECT * FROM dbo.Users WHERE Email = ?'
        # Execute the SELECT query to fetch the user by id
        self.cursor.execute(query, email)
        row = self.cursor.fetchone()
        if row is None:
            return None
        # Create a new User object and return it
        return User.User(*row)