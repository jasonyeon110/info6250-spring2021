import { useState } from 'react';
import { createSession } from './services';
import Loading from './Loading';

const Login = function ({ onLogin }) {
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState('');

    const onChange = function (e) {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const login = function () {
        setIsPending(true);
        createSession({ username })
            .then(userinfo => {
                setStatus('');
                setIsPending(false);
                onLogin({ username, info: userinfo.info });
            })
            .catch(err => {
                console.log(err);
                setStatus(err);
                setIsPending(false);
            });
    };

    return (
        <div className="logging-in-box">
            <h2 id="welcome">Welcome to</h2>
            <h1 id="title">Foodiary</h1>
            { status && <div class="status">{status}</div>}
            {!isPending && <div className="log-input">
                <input type="text" placeholder="Username" id="username" disabled={isPending} onChange={onChange} value={username} />
            </div>}
            {isPending && <Loading />}
            {!isPending && <button id="login-btn" onClick={login} disabled={isDisabled || isPending} >{isPending ? '...' : "Login"}</button>}
            <p>Some users are not allow to login.. &#x1F436;</p>
        </div>
    );
};
export default Login;
