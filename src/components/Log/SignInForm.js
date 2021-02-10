import React, {useState} from 'react';
import axios from 'axios';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gestConnection = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.invalid-feedback');
    const passwordError = document.querySelector('.password.invalid-feedback');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data:{
        email,
        password,
      } 
    }).then((res)=>{
      if(res.data.errors){
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
        
      }
      else{
        window.location = '/home';
      }
    }).catch((err)=>{
       console.log(err);
    })
  }

  return (
  
    <form action='' onSubmit={gestConnection} id='signin-form'>
      <div className="form-group">
        <label htmlFor='email' >Email</label>
        <input type='text' name='email' className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <div className="email invalid-feedback"></div>
        
      </div>
      
      <div className="form-group">
        <label htmlFor='password'>Mot de passe</label>
        <input type='password' name='password' className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        <div className="password invalid-feedback"></div>
      </div>
    <div className="form-group">
      <button type='submit' className="btn btn-dark col">Connexion</button>
    </div>
    </form>
  )
}

export default SignInForm;