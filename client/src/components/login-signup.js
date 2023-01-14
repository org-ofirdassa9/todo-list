import React, { useState } from 'react';
import axios from 'axios';

const baseUrl ='http://localhost:5000'

function LoginSignup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    isSignup: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.isSignup) {
        try {
            if (form) {
                const res = await axios.post(`${baseUrl}/signup`, {
                    email: form.email,
                    password: form.password,
                    firstname: form.firstname,
                    lastname: form.lastname
                });
                if (res.data['status_code'] === 200 && res.data['message']['_has_password']) {
                    console.log(res['data'])
                    form.email = ''
                    form.password = ''
                    form.firstname = ''
                    form.lastname = ''
                    handleToggleSignup();
                } else {
                    console.log(res['data'])
                }
            } else {
                console.error({'status_code': 200, 'message': 'No attributes were supplied!'});
            }
        } catch (error) {
          console.error(error.message)
        }
    } else {
        try {
            if (form.email) {
                const res = await axios.post(`${baseUrl}/login`, {
                    email: form.email,
                    password: form.password
                });
                if (res.data['status_code'] === 200 && res.data['message'] === 'Welcome!') {
                    form.email = ''
                    form.password = ''
                    setForm({
                        ...form,
                        isSignup: false
                      });
                    console.log(res['data'])
                } else {
                    console.log(res['data'])
                }
            } else {
                console.error({'status_code': 200, 'message': 'No email was supplied!'});
            }
        } catch (error) {
          console.error(error.message)
        }
    }
  }

  const handleToggleSignup = () => {
    setForm({
      ...form,
      isSignup: !form.isSignup
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {form.isSignup && 
          <div>
            <label>
                First Name:
                <input type="text" name="firstname" value={form.firstname} onChange={handleInputChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastname" value={form.lastname} onChange={handleInputChange} />
            </label>
          </div>
        }
        <div>
          <label>
            Email:
            <input type="email" name="email" value={form.email} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={form.password} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <button type="submit">
            {form.isSignup ? 'Sign up' : 'Log in'}
          </button>
          <button type="button" onClick={handleToggleSignup}>
            {form.isSignup ? 'Already have an account?' : 'Create an account'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginSignup;
