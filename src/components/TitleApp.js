import React from 'react'
import {Link} from 'react-router-dom';
import { logout } from '../api/auth';
import { AuthContextConsumer } from './auth/context';
import { aboutMe } from '../api/auth';

const TitleApp = ({isLogged, onLogout}) => {

  const [me, setMe] = React.useState(null);

  React.useEffect(() => {
    getMe();
    console.log('cambio')
    
  }, []);

  const getMe = async () => {
    await aboutMe().then(setMe);
  };

  const handleLogout = () => {
    logout().then(onLogout);
  }

    return <div className='title-container'>
    <h1><div className='title' ><Link to='/'>NodePop</Link></div></h1>
    <div className='subtitle-container'>
      {isLogged ? <>{ me ? <div style={{textAlign: 'center'}}>Logged as <b>{me.username}</b></div> : ''} <button style={{marginBottom:30, fontSize:15}} onClick={handleLogout}>Logout</button> 
      <div><Link to='/advert/new'><button id='myBtn' className='buttonAdd' ><b>+</b> New Advert</button></ Link></div></>
      : ''}
    </div>
  </div>;
}

const ConnectedTitle = props => {
  return (
    <AuthContextConsumer>
      {value => {
        return (
          <TitleApp
            isLogged={value.isLogged}
            onLogout={value.onLogout}
            {...props}
          />
        );
      }}
    </AuthContextConsumer>
  );
};

export default ConnectedTitle;