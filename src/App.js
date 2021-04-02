import React from 'react';
import AdsList from './components/AdsList';
import TitleApp from './components/TitleApp';
import AdDetail from './components/AdDetail';
import NewAd from './components/NewAd.js'
import LoginPage from './components/LoginPage';
import { AuthContextProvider } from './components/auth/context';
import { Redirect, Route, Switch } from 'react-router-dom';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);
  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  const [queries, setQueries] = React.useState(
    
    JSON.parse(localStorage.getItem('queries')) ||
      {
        id:'',
        nombre:'',
        precio:[0,5000],
        venta:'',
        tags:'',
        sort:'',
        order:''
    });

  return (
    <div className="App">
      
      <AuthContextProvider value={authValue}>
        <Switch>
          {/* <Route path='/detail/:id' render= {({match}) => (<Test adId={match} />)} /> */}
          <Route exact path='/'>
            <Redirect to='/adverts' />
          </Route>
          <Route exact path='/adverts' render= {() => (isLogged ? <div><TitleApp titleApp='NodePop'/><AdsList queries={queries} setQueries={setQueries} /></div> : <Redirect to='/login' />)} />
          <Route path='/advert/new' render={ () => (isLogged ? <><TitleApp titleApp='NodePop'/><NewAd /></> : <Redirect to='/login' />) } />
          <Route path='/advert/:id' render={({match}) => (isLogged ? <div><TitleApp titleApp='NodePop'/><AdDetail adId={match} /></div> : <Redirect to='/login' />)} />
          <Route exact path='/login' render={ () => !isLogged ? <><TitleApp titleApp='NodePop'/><LoginPage /></> : <Redirect to='/' />}/>
          {/* <Route exact path='/login' component={ LoginPage }/> */}
          <Route path='' render={()=><div>No existe</div>} />

        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
