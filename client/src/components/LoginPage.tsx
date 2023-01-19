import React, {useState} from 'react'
import httpClient from '../httpClient';

const baseUrl = "//localhost:5000/api"

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () => {
        try {
            const resp = await httpClient.post(`${baseUrl}/login`, {
                email,
                password,
            })
            window.location.href = "/"
            console.log(resp)
        }
        catch (error: any) {
            if (error.response.status === 403) {
                alert("Invalid credentials");
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
            <label>Password: </label>
            <input
                type="passowrd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id=""
            />
        </div>
        <button type='button' onClick={() => logInUser()}>Sumbit</button>
      </form>
    </div>
  )
}

export default LoginPage
