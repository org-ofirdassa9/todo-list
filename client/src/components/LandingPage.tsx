import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import httpClient from '../httpClient';
import { User } from '../types';
import Logout from './Logout';

const baseUrl="//localhost:5000/api"

const LandingPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get(`${baseUrl}/@me`);
                setUser(resp.data);
            }
            catch (error) {
                console.error("Not Authenticated");
            }
        })()
    }, []);

  return ( 
    <div>
        <h1>Welcome to this React Application</h1>
        {user != null ? (
        <div>
            <h1>Logged in!</h1>
            <h3>User {user.first_name} {user.last_name}</h3>
            <Link to={{ pathname: '/todo', search: `user=${user.first_name}` }}>
                <button>Go to Todo</button>
            </Link>
            <Logout />
        </div>
        ) : (
        <div>
            <p>You are not logged in</p>
            <a href='/login'><button>Log in</button></a>
            <a href='/signup'><button>Sign up</button></a>
        </div>
        )}
        
    </div>
  );
}

export default LandingPage
