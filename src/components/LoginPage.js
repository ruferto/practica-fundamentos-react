import React from 'react';
import { login } from '../api/auth';
import { AuthContextConsumer } from './auth/context'

const Login = (authValue) => {

    const { onLogin, isLoading, handleStartLoading, handleFinishLoading } = authValue;
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        validEmail: false,
        validPassword: false,
        wantsToBeRemembered: false
    });
    const {email, password, validEmail} = credentials;
    const [error, setError] = React.useState(null); 

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
            setError(null);
            break;
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          handleStartLoading();
            await login(credentials).then(onLogin);
        }catch(error){
            console.log(error);
            setError(error);
        }finally{
          handleFinishLoading();
        }
    }

    return <div className='login-container'>

    <form className='form-login' onSubmit={handleSubmit}>
        <input className='form-login-email' name='email' id='email' placeholder='email' onChange={handleChange} disabled={isLoading} />
        <input className='form-login-password' name='password' id='password' type='password' placeholder='Contraseña' onChange={handleChange} disabled={isLoading} />
        <button className='login-button' disabled={isLoading || !email || !password || !validEmail} >Login</button>
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <input type='checkbox' id='wantsToBeRemembered' name='wantsToBeRemembered' defaultChecked={credentials.wantsToBeRemembered} onClick={handleChange} disabled={isLoading}/>&nbsp;
            <label style={{fontSize: 12}} htmlFor='wantsToBeRemembered' >Remember me</label>
        </div>
    </form>
    {isLoading ? <div className='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ''}
    {error ? <div style={{color: 'white', backgroundColor:'red', marginTop:30, padding: 10, borderRadius: '15px'}}>Error: {error.status === 401 ? 'Wrong username or password' : error.message}</div> : ''}
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
              isLoading={value.isLoading}
              handleStartLoading={value.handleStartLoading}
              handleFinishLoading={value.handleFinishLoading}
              {...props}
            />
          );
        }}
      </AuthContextConsumer>
    );
  };

export default ConnectedLogin