import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession } from './services';
import Nav from './Nav';
import Login from './Login';
import ShowStuff from './ShowStuff';

function App() {
  // Top level state is passed down as props to descendents
  // Any changes are made via callbacks also passed as props
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });

  useEffect( () => {
    checkSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        username: userinfo.username,
        info: userinfo.info,
      });
    })
    .catch( () => {
      // We treat any failure as not logged in
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    });
  }, []); // only run on initial render

  const login = function({username, info}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
      info,
    });
  };

  const logout = function() {
    // Inform UI to wait
    setUserState({
      ...userState,
      isPending: true,
    });
    // Begin logout
    endSession()
    .then( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch( () => {
      // TODO: notify user of issue
      setUserState({
        ...userState,
        isPending: false,
      });
    });
  };

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  let content;

  if(userState.isLoggedIn) {
    content = <ShowStuff stuff={userState.info}/>;
  } else {
    content = <Login onLogin={login}/>;
  }

  return (
    <div className="app">
      <Nav user={userState} onLogout={logout}/>
      {content}
    </div>
  );
}

export default App;
