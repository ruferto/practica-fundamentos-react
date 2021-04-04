import React from 'react'
import {Link} from 'react-router-dom';
import { logout } from '../api/auth';
import { AuthContextConsumer } from './auth/context';
// import { aboutMe } from '../api/auth';
import ConfirmationPanel from './ConfirmationPanel';

const TitleApp = ({isLogged, onLogout, me}) => {

  // const [me, setMe] = React.useState(null);
  const [tryToLogout , setTryToLogout] = React.useState(false);

  // React.useEffect(() => {
  //   if(isLogged){
  //     getMe();
  //   }
  // }, [isLogged]);

  // const getMe = async () => {
  //   await aboutMe().then(setMe);
  // };

  const handleLogout = () => {
    logout().then(onLogout);
    setTryToLogout(false);
  }

  const preLogout = () => {
    setTryToLogout(true);
  }

  const cancelLogout = () => {
    setTryToLogout(false);
  }

    return <div className='title-container'>
    {tryToLogout ? 
    <ConfirmationPanel deleteSure={handleLogout} cancelDelete={cancelLogout} message={'Do you really want to leave?'} subtitle={''} /> : ''}
    <h1><div className='title' ><Link to='/'>NodePop</Link></div></h1>
    <div className='subtitle-container'>
      {isLogged ? <>{ me ? <div style={{textAlign: 'center'}}>Logged as <b>{me}</b></div> : ''} <button style={{marginBottom:30, fontSize:15}} onClick={preLogout}>Logout</button> 
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
            me={ value.profile ? value.profile.username: 'none'}
            {...props}
          />
        );
      }}
    </AuthContextConsumer>
  );
};

export default ConnectedTitle;