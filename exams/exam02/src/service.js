export const performLogin = function (username) {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const checkLoginStatus = function () {
    console.log(`checkLoginStatus() activated`)
    return fetch('/session', {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        })
        .catch(() => {
            return Promise.reject({ error: 'Login Required' });
        })
};

export const performLogout = function (username) {
    return fetch('/session', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
};
