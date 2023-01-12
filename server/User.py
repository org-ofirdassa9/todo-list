class User():

    def __init__(self, id, email, has_password, first_name, last_name, created_at):
        self._id = id
        self._email = email
        self._has_password = has_password
        self._first_name = first_name
        self._last_name = last_name
        self._created_at = created_at
    
    @classmethod
    def from_string(cls, user_string):
        id, email, hashed_password, first_name, last_name = user_string.split('-')
        return cls(id, email, hashed_password, first_name, last_name)
    
    @staticmethod
    def check_password(hashed_password):
        if 'b' in hashed_password:
            return True
        return False

    def format_user(self): 
        return {
            'id': self._id,
            'email': self._email,
            'has_password': self._has_password,
            'fist_name': self._first_name,
            'last_name': self._last_name,
            'created_at': self._created_at
        }