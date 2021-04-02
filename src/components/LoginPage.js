import React from 'react';
// import { Redirect } from 'react-router-dom';
import { login } from '../api/auth.js';
import { AuthContextConsumer } from './auth/context'

const Login = (authValue) => {
    const { onLogin } = authValue;

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        validEmail: false,
        validPassword: false
    });
    const {email, password, validEmail} = credentials;
    

    const handleChange = (event) => {
        setCredentials(oldValue => ({
            ...oldValue,
            [event.target.name]: event.target.value,
          }));
        if(event.target.name === 'email'){
            setCredentials(oldValue => ({
                ...oldValue,
                validEmail: event.target.value.indexOf('@') !== -1
            }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            onLogin();
            await login({
                email: credentials.email,
                password: credentials.password
            }).then(onLogin);
        }catch(error){
            console.log(error);
        }
    }

    //if(isLogged) return <Redirect to="/" />
    
    return <div className="login-container">
    <form className="form-login" method="GET" onSubmit={handleSubmit}>
        <input className="form-login-email" name="email" id="email" placeholder="email" onChange={handleChange} />
        <input className="form-login-password"name="password" id="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <button className="login-button" disabled={!email || !password || !validEmail} >Login</button>
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <input type='checkbox' id='remember' name='remember' />&nbsp;
            <label style={{fontSize: 12}}for='remember'>Remember me</label>
        </div>
    </form>
    {/* <Link to="/">Don't have an account? Register</Link> */}
</div>

}
const ConnectedLogin = props => {
    return (
      <AuthContextConsumer>
        {value => {
          return (
            <Login
              isLogged={value.isLogged}
              onLogin={value.onLogin}
              {...props}
            />
          );
        }}
      </AuthContextConsumer>
    );
  };

export default ConnectedLogin