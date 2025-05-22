import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

      const validatePassword = (pass) =>{
            if (pass.length < 8) return "Password must be at least 8 characters";
            if (!/[A-Z]/.test(pass)) return "Password must contain an uppercase letter";
            if (!/[a-z]/.test(pass)) return "Password must contain a lowercase letter";
            if (!/[0-9]/.test(pass)) return "Password must contain a number";
            return "";
        }

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if (password !== confirmPass) {
      setMsg("Passwords do not match");
      return;
    }

    const invalidPassword = validatePassword(password);
    if (invalidPassword) {
      setMsg(invalidPassword);
      return;
    }
       
              try {
                const res = await axios.post(
                    'https://movie-watchlist-wwt5.onrender.com/signup',
                    {username, password},
                    { withCredentials: true }
                ).then(res => {
                    navigate('/login')
                })
         
                setUsername('');
                setPassword('');
                setConfirmPass('');            
            }catch(err){
              setMsg(err.response?.data?.msg || "Something went wrong");
            }
}

return (
    <div className='flex justify-center items-center text-white m-15'>
        <div className="signup bg-white flex flex-col flex-1 max-w-[600px] rounded-[10px] mt-10">
            <h2 className="text-center bg-black p-3 text-white font-bold rounded-t-[10px]">Sign Up</h2>
            <form className="bg-white text-gray-800 p-10 flex flex-col rounded-b-[10px]" onSubmit={handleSubmit}>
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
                  <label htmlFor='confirmPass' className="py-2 font-bold">Password Confirmation</label>
                <input 
                id='confirmPass'
                className="bg-gray-200 p-2 rounded-md w-full"
                placeholder="Confirm your password"
                type='password'
                value={confirmPass}  
                onChange={(e) => setConfirmPass(e.target.value)}
                />
                 {msg && <p className="message text-center text-red-500 mt-3">{msg}</p>}
                <button type="submit" className="bg-black text-white p-3 rounded-md mt-8">Sign Up</button>
            </form>
        </div>
    </div>
)
}