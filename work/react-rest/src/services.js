export const getFactsService = () => {
    return fetch('/api/facts', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'networ-error' }))
        .then(response => {
            return response.json();
        })
}

