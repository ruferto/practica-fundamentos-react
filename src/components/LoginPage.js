import React from 'react';
import { login } from '../api/auth.js';
import { AuthContextConsumer } from './auth/context'

const Login = (authValue) => {
    const { onLogin } = authValue;

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        validEmail: false,
        validPassword: false,
        wantsToBeRemembered: false
    });
    const {email, password, validEmail} = credentials;
    

    const handleChange = (event) => {
        
        switch (event.target.name) {
          
          case 'wantsToBeRemembered':
            setCredentials(oldValue => ({
              ...oldValue,
              wantsToBeRemembered: event.target.checked,
            }));
            break;

            case 'email':
            setCredentials(oldValue => ({
              ...oldValue,
              validEmail: event.target.value.indexOf('@') !== -1
            }));
          // eslint-disable-next-line no-fallthrough
          default:
            setCredentials(oldValue => ({
              ...oldValue,
              [event.target.name]: event.target.value,
            }));
            break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await login(credentials).then(onLogin);
        }catch(error){
            console.log(error);
        }
    }
    
    return <div className="login-container">
    <form className="form-login" method="GET" onSubmit={handleSubmit}>
        <input className="form-login-email" name="email" id="email" placeholder="email" onChange={handleChange} />
        <input className="form-login-password"name="password" id="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <button className="login-button" disabled={!email || !password || !validEmail} >Login</button>
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <input type='checkbox' id='wantsToBeRemembered' name='wantsToBeRemembered' defaultChecked={credentials.wantsToBeRemembered} onClick={handleChange}/>&nbsp;
            <label style={{fontSize: 12}}for='wantsToBeRemembered' >Remember me</label>
        </div>
    </form>
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