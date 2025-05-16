import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
       
              try {
                const res = await axios.post(
                    'https://movie-watchlist-wwt5.onrender.com/login',
                    {username, password},
                    { withCredentials: true }
                ).then(res => {
                    navigate(`/watchlist/${username}`)
                })
        
                setUsername('');
                setPassword('');                
            }catch(err){
              setMsg(err.response?.data?.msg || "Something went wrong");
            }
}

return (
    <div className='login-container'>
        <div className="login">
            <h2>Log In</h2>
            <form method='POST' onSubmit={handleSubmit}>
              <label htmlFor='user'>UserName</label>
                <input 
                id='user'
                placeholder="Username"
                type='text'
                value={username}  
                onChange={(e) => setUsername(e.target.value)}
                />
                  <label htmlFor='user'>Password</label>
                <input 
                id='user'
                placeholder="Password"
                type='password'
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Log In</button>
            </form>
            {msg && <p className="message">{msg}</p>}
        </div>
    </div>
)
}