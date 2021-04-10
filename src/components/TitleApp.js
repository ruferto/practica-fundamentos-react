import React from 'react'
import { NavLink } from 'react-router-dom';
import { logout } from '../api/auth';
import { AuthContextConsumer } from './auth/context';
import ConfirmationPanel from './ConfirmationPanel';

const TitleApp = ({isLogged, onLogout, me}) => {

  const [TryingToLogout , setTryingToLogout] = React.useState(false);

  const handleLogout = () => {
    logout().then(onLogout);
    setTryingToLogout(false);
  }

  const preLogout = () => {
    setTryingToLogout(true);
  }

  const cancelLogout = () => {
    setTryingToLogout(false);
  }

    return <div className='title-container'>
    {TryingToLogout ? 
    <ConfirmationPanel deleteSure={handleLogout} cancelDelete={cancelLogout} message={'Do you really want to leave?'} subtitle={''} /> : ''}
    <h1><div className='title' ><NavLink to='/adverts' className='title' activeStyle={{textShadow: '0px 3px 2px black'}} >NodePop</NavLink></div></h1>
    <div className='subtitle-container'>
      {isLogged ? <>{ me ? <div style={{textAlign: 'center', paddingBottom:5}}>Logged as <b>{me}</b></div> : ''} <button style={{marginBottom:30, fontSize:15}} onClick={preLogout}><img src='/images/logout.png' width='14' alt='logout'/> Logout</button> 
      <div><NavLink to='/advert/new' className='newAdLink' activeClassName='activeLink' ><b>+</b> New Advert</ NavLink></div></>
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