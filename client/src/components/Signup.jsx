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
    <div className='registration-container'>
        <div className="register">
            <h2>Sign Up</h2>
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
                  <label htmlFor='user'>Password Confirmation</label>
                <input 
                id='user'
                placeholder="Confirm your password"
                type='password'
                value={confirmPass}  
                onChange={(e) => setConfirmPass(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {msg && <p className="message">{msg}</p>}
        </div>
    </div>
)
}