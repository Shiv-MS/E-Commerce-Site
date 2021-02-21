import React,{useState}from 'react'
import "./Login.css";
import {Link} from 'react-router-dom';
function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

const signIn =(e)=>{
e.preventDefault();
}
    return (
        <div className='login'>
          <Link to='/'>
      <img
        src="https://via.placeholder.com/150C/O https://placeholder.com/" alt="" className="login_logo"/>
        </Link>
        <div className="login_container">
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <h5>Password</h5>
                <input type="password"value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='login_signInButton'>Sign-in</button>
            </form>
            <button className='login_registerButton'>create your amazon account</button>
        </div>
        </div>
    )
}

export default Login
