(function iife() {
  const list = document.querySelector('.names');
  const status = document.querySelector('.status');
  const add = document.querySelector('.add');
  const toAdd = document.querySelector('.add-name');

  let names = []; // Application state

  const errMsgs = { // translate error codes to human-friendly messages
    'duplicate': 'That name already exists',
    'network-error': 'There was a problem connecting to the network, try again',
  };

  // Rendering functions (update HTML)

  function updateStatus( message ) {
    status.innerText = message;
  }

  function renderNames( names ) {
    const html = names.map(
      (name) => `
        <li>
          <span class="name">${name}</span><span class="delete" data-name="${name}">X</span>
        </li>`
    ).join('');
    list.innerHTML = html;
  }

  // Used by multiple fetch() calls
  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  // Adding handlers for various DOM events
  list.addEventListener('click', (e) => {
    // The below 'if' is making sure they clicked on the X
    // and not elsewhere in the list
    if(e.target.classList.contains('delete') ) {
      const name = e.target.dataset.name;
      fetch(`/people/${name}`, {
        method: 'DELETE',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( names => {
        renderNames(names);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });

  add.addEventListener('click', () => {
    const name = toAdd.value;
    if(name) {
      fetch(`/people/${name}`, {
        method: 'POST',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError)
      .then( names => {
        toAdd.value = '';
        renderNames(names);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });


  // code that runis on page load
  // (Technically it all runs on page load, but this has an immediate visible effect)
  fetch('/people/', {
    method: 'GET',
  })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then( convertError )
    .then( names => {
      renderNames(names);
      updateStatus('');
    })
    .catch( err => {
      updateStatus(errMsgs[err.error] || err.error);
    });
})();
