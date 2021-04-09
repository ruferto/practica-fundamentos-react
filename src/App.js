import React from 'react';
import AdvertsPage from './components/AdvertsPage';
import TitleApp from './components/TitleApp';
import AdvertPage from './components/AdvertPage';
import NewAdvertPage from './components/NewAdvertPage';
import LoginPage from './components/LoginPage';
import { AuthContextProvider } from './components/auth/context';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { aboutMe } from './api/auth';
import NotFoundPage from './components/NotFoundPage';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);
  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setProfile(null);
  }

  const [profile, setProfile] = React.useState(null);
  

  React.useEffect(() => {
    if(isLogged){
      getMe();
    }
  }, [isLogged]);

  const getMe = async () => {
    await aboutMe().then(setProfile);
  };

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
    profile,
    handleProfile: setProfile
  };

  return (
    <div className='App'>
      
      <AuthContextProvider value={authValue} >
      <TitleApp me={profile ? profile.username : null} />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/adverts' />
          </Route>
          <PrivateRoute exact path='/adverts' render= {() => ( <div><AdvertsPage me={profile ? profile.id : null}/></div> )} />
          <PrivateRoute path='/advert/new' render={ () => <><NewAdvertPage /></> } />
          <PrivateRoute path='/advert/:id' render={({match}) => <div><AdvertPage adId={match} /></div>  } />
          <Route exact path='/login' render={ LoginPage }/>
          <Route path='/404'>
            <NotFoundPage />
          </Route>
          <Route>
            <Redirect to='/404' />
          </Route>

        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
