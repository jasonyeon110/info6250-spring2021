import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession } from './services';
import Nav from './Nav';
import Login from './Login';
import Loading from './Loading';
import Reviews from './Reviews';
import Info from './Info';

function App() {

  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });

  useEffect(() => {
    checkSession()
      .then(userinfo => {
        setUserState({
          isLoggedIn: true,
          isPending: false,
          username: userinfo.username,
          info: userinfo.info,
        });
      })
      .catch(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      });
  }, []);

  const login = function ({ username, info }) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
      info,
    });
  };

  const logout = function () {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
      .then(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      })
      .catch(() => {
        setUserState({
          ...userState,
          isPending: false,
        });
      });
  };

  if (userState.isPending) {
    return (
      <div className="app">
        <Loading />
      </div>
    );
  }

  let content;

  if (userState.isLoggedIn) {
    content = <>
      <Info />
      <Reviews className="app-reviews" reviews={userState.info} setUserState={setUserState} />
    </>

  } else {
    content = <Login onLogin={login} />;
  }

  return (
    <section className="app">
      <Nav user={userState} onLogout={logout} />
      {content}
    </section>
  );
}

export default App;
