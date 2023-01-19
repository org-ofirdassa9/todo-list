import React, {useState} from 'react'
import httpClient from '../httpClient';

const baseUrl = "//localhost:5000/api"

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const registerUser = async () => {
        try {
            const resp = await httpClient.post(`${baseUrl}/signup`, {
                email,
                firstName,
                lastName,
                password,
            })
            window.location.href = "/"
            console.log(resp)
        }
        catch (error: any) {
            if (error.response.status === 403) {
                alert('Email already exsits');
            }
        }
    };
  return (
    <div>
      <h1>Log in to your account</h1>
      <form>
        <div>
            <label>Email: </label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id=""
            />
        </div>
        <div>
            <label>First Name: </label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id=""
            />
        </div>
        <div>
            <label>Last Name: </label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id=""
            />
        </div>
        <div>
            <label>Password: </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id=""
            />
        </div>
        <button type='button' onClick={() => registerUser()}>Sumbit</button>
        <button type='button' onClick={() => window.location.href = '/'}>Home Page</button>
      </form>
    </div>
  )
}

export default SignupPage
