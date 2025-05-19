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
                    await axios.post(
                    'https://movie-watchlist-wwt5.onrender.com/login',
                    {username, password},
                    { withCredentials: true }         
                )
                console.log('Login successful:', res.data);
                setUsername('');
                setPassword('');
                navigate(`/watchlist`)           
            }catch(err){
              setMsg(err.response?.data?.msg || "Something went wrong");
            }
}

return (
    <div className='login-container min-h-[100vh] flex justify-center items-center text-white'>
        <div className="login max-w-[90vh] bg-red-600 min-h-[70vh] rounded-[10px]">
            <h2 className="">Log In</h2>
            <form className="form bg-black p-16 border border-white p-16" onSubmit={handleSubmit}>
              <label htmlFor='user'>UserName</label>
                <input 
                id='user'
                placeholder="Username"
                type='text'
                value={username}  
                onChange={(e) => setUsername(e.target.value)}
                />
                  <label htmlFor='password'>Password</label>
                <input 
                id='password'
                placeholder="Password"
                type='password'
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className="bg-gray-600 text-white">Submit</button>
            </form>
            {msg && <p className="message">{msg}</p>}
        </div>
    </div>
)
}