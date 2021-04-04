import React from 'react';
import AdsList from './components/AdsList';
import TitleApp from './components/TitleApp';
import AdDetail from './components/AdDetail';
import NewAd from './components/NewAd.js'
import LoginPage from './components/LoginPage';
import { AuthContextProvider } from './components/auth/context';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { aboutMe } from './api/auth';
import storage from './utils/storage'; 

const QUERIES_KEY = 'queries'
function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);
  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => setIsLogged(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const handleStartLoading = () => setIsLoading(true);
  const handleFinishLoading = () => setIsLoading(false);

  React.useEffect(() => {
    if(isLogged){
      getMe();
    }
  }, [isLogged]);

  const getMe = async () => {
    await aboutMe().then(setProfile);//.then(console.log(profile));
  };

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
    isLoading,
    setIsLoading,
    handleStartLoading,
    handleFinishLoading,
    profile,
    handleProfile: setProfile
  };

      //console.log(profile.username);

  const [queries, setQueries] = React.useState(
     profile ? JSON.parse(storage.get(profile.username)) :
      {
        id:'',
        nombre:'',
        precio:[0,5000],
        venta:'',
        tags:''
    });

  return (
    <div className="App">
      
      <AuthContextProvider value={authValue} >
      <TitleApp />
        <Switch>
          {/* <Route path='/detail/:id' render= {({match}) => (<Test adId={match} />)} /> */}
          <Route exact path='/'>
            <Redirect to='/adverts' />
          </Route>
          <PrivateRoute exact path='/adverts' render= {() => (isLogged ? <div><AdsList queries={queries} setQueries={setQueries} /></div> : <Redirect to='/login' />)} />
          <PrivateRoute path='/advert/new' render={ () => <><NewAd /></> } />
          <PrivateRoute path='/advert/:id' render={({match}) => <div><AdDetail adId={match} /></div>  } />
          <Route exact path='/login' render={ () => !isLogged ? <><LoginPage /></> : <Redirect to='/' />}/>
          {/* <Route exact path='/login' component={ LoginPage }/> */}
          <Route path="/404">
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>

        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
