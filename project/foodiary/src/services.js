// import { response } from "express";

export const checkSession = () => {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const createSession = ({ username }) => {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const endSession = () => {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const addReviewToUsersList = ({ name, rating, review }) => {
    return fetch(`/api/review/`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ name, rating, review }),
    })
        .catch(() => {
            Promise.reject({ error: "network error" });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => Promise.reject(error));
        })
};

export const deleteReview = (name) => {
    console.log(`service deleteReview function id received from handleDelte => ${name}`)
    return fetch(`/api/reviews/${name}`, {
        method: 'DELETE',
    })
        .catch(() => {
            Promise.reject({ error: "network error" });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => Promise.reject(error));
        })
};
