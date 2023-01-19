import React from 'react'
import httpClient from '../httpClient'

const baseUrl = "//localhost:5000/api"

const Logout: React.FC = () => {
    
    const logOutUser = async () => {
        await httpClient.post(`${baseUrl}/logout`);
        window.location.reload()
    }

  return (
    <div>
      <button onClick={logOutUser}>Logout</button>
    </div>
  )
}

export default Logout
