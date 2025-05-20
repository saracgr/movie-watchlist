import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { logInContext } from "../App";
import { useContext } from "react";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate()
    
    const {logInUser, setLogInUser} = useContext(logInContext)
    
    console.log(logInUser)

    const handleSubmit = async (e) => {
        e.preventDefault()
              try {
                    const res = await axios.post(
                    'https://movie-watchlist-wwt5.onrender.com/login',
                    {username, password},
                    { withCredentials: true }         
                )

                if(res.status === 200){
                  setLogInUser({username, password})
                  setIsLogged(true)
                }
                console.log('Login successful:', res.data);
                setUsername('');
                setPassword('');
                navigate(`/watchlist`)           
            }catch(err){
              setMsg(err.response?.data?.msg || "Something went wrong");
            }
}

return (
    <div className='login-container flex justify-center items-center text-white'>
        <div className="login bg-black min-w-[70vh] m-20 rounded-[10px]">
            <h2 className="text-center mt-3 font-bold">Log In</h2>
           {!isLogged ? (
            <>
            <form className="form bg-white text-gray-800 p-10 mt-3 min-h-[55vh] rounded-b-[10px]" onSubmit={handleSubmit}>
              <label htmlFor='user' className="py-2 font-bold">UserName</label>
                <input 
                id='user'
                className="bg-gray-200 p-2"
                placeholder="Username"
                type='text'
                value={username}  
                onChange={(e) => setUsername(e.target.value)}
                />
                  <label htmlFor='password' className="py-2 font-bold">Password</label>
                <input 
                id='password'
                className="bg-gray-200 p-2"
                placeholder="Password"
                type='password'
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
                />
                 {msg && <p className="message mt-5">{msg}</p>}

                <button type='submit' className="red-700 rounded-10 mt-5 font-bold">SUBMIT</button>
            </form>
             </>
           ): <p>{logInUser.username}, you have sucessfuly logged in!</p>}
        </div>
    </div>
)
}