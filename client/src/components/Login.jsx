import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { logInContext } from "../App";
import { useContext } from "react";
import { BeatLoader } from 'react-spinners'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false) 
    const [msg, setMsg] = useState('')
    
    const navigate = useNavigate()
    const {logInUser, setLogInUser} = useContext(logInContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
              try {
                    const res = await axios.post(
                    'https://movie-watchlist-wwt5.onrender.com/login',
                    {username, password},
                    { withCredentials: true }         
                )      
                setLogInUser({username})
                setIsLoading(false);
                console.log('Login successful:', res.data);
                setUsername('');
                setPassword('');
                navigate(`/watchlist`)           
            }catch(err){
              setMsg(err.response?.data?.msg || "Something went wrong");
              setIsLoading(false);
            }
}

const logOut = async () =>{
  try {
        await axios.post('https://movie-watchlist-wwt5.onrender.com/logout', {}, {
        withCredentials: true
      });
        setLogInUser(null)
        navigate('/')
      }catch(err){
        console.error('Logout has failed', err)
    }
}

return (
    <div className='login-container flex justify-center items-center text-white m-15'>
        <div className="login flex flex-col flex-1 max-w-[600px] bg-white min-h-[60vh] mt-10 rounded-[10px]">
          <h2 className="text-center bg-black py-3 font-bold rounded-t-[10px]">LOG IN</h2>
          {logInUser?.username ? (
              <div className="bg-white rounded-b-[10px] text-black text-center mt-[12vh]">
                <p className="p-10">Hi <span className="font-bold">{logInUser.username}</span>, you have successfully logged in!</p>
                <button onClick={logOut} className="bg-black text-white p-3 rounded-md mt-10">Log Out</button>
              </div>
            ) : (
              <form className="form flex flex-col bg-white text-gray-800 p-10 rounded-b-[10px]" onSubmit={handleSubmit}>
                <label htmlFor='user' className="py-2 font-bold">UserName</label>
                <input 
                id='user'
                className="bg-gray-200 p-2 rounded-md w-full"
                placeholder="Username"
                type='text'
                value={username}  
                onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password' className="py-2 font-bold">Password</label>
                <input 
                id='password'
                className="bg-gray-200 p-2 rounded-md w-full"
                placeholder="Password"
                type='password'
                value={password}  
                onChange={(e) => setPassword(e.target.value)}
                />
                 {msg && <p className="message mt-5 text-center">{msg}</p>}
               <div className="flex justify-center gap-10 mt-10">
                {isLoading ? <BeatLoader /> : (
                  <>
                  <button type='submit' className="bg-black text-white p-3 rounded-md">Submit</button>
                  <button onClick={() => navigate('/signup')} className="bg-orange-500 text-white p-3 rounded-md">Sign Up</button>
                  </>
                )}
               </div>
            </form>
           )}
        </div>
    </div>
)
}