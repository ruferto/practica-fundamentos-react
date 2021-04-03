import {Link} from 'react-router-dom';
import { logout } from '../api/auth';
import { AuthContextConsumer } from './auth/context'



const TitleApp = ({isLogged, onLogout}) => {
  const handleLogout = () => {
    logout().then(onLogout);
  }

    return <div className='title-container'>
    <h1><div className='title' ><Link to='/'>NodePop</Link></div></h1>
    <div className='subtitle-container'>
      {isLogged ? <><button style={{marginBottom:30, fontSize:15}} onClick={handleLogout}>Logout</button> 
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