# React REST 

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-chat' (`git checkout -b react-rest`)
* Add files as required
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s)
* Due by 11:59pm (PT) Sun Apr 11

## Goals and Requirements

The goal is to:
* Write a React-based SPA that makes use of RESTful services
* Write the RESTful services
* Serve the react files from a separate server from services during development
* Serve both the services and the built static files from the same server for production use
* Add scripts to the package.json to allow you to:
  - Run a separate services server during development with nodemon accessed via proxy
    - Hint: You will have to add the `proxy` line in your `package.json`
  - Run the single server for production use on port 5000
* The only things required is to run:
  - `npm install`
  - `npm run build`
  - `npm run serve` (NOT `npm start` - you will use that in development)
    - Hint: set ./build as your directory for static files
  - Hint: Make sure this flow works!

## Requirements

### Submission
- Your code must be usable on http://localhost:5000 after running `npm install;`, `npm run build;`, and then `npm run serve;` 
- DO NOT COMMIT YOUR BUILT static files - there should be no files in `build/` in your PR
  - create-react-app already puts this in a .gitignore file for you

### Functionality
- There is no login requirement
- There is no polling requirement
- The entire flow must be a single page load for the browser, with all later steps being SPA-based service calls that update the HTML of the page
- Show meaningful error messages if there are problems reaching the server
- These command line options must work:
  - `npm install`: As normal
  - `npm start`: As provided by create-react-app
  - `npm run build`: As provided by create-react-app
  - `npm run dev`: Starts the server.js using nodemon
  - `npm run serve`: Starts the server.js using node
- On initial load the users will see a page that:
  - says "0 facts loaded" 
  - Has a button to "Load Facts"
  - Has a dropdown labeled "Facts per page"
    - The dropdown has the options "5" or "10"
  - There is NOT a "Showing Facts" label (see below) until you have more than 0 facts
  - There are NOT "Previous" or "Next" buttons (see below) until you have more than 0 facts
- On pressing the "Load Facts" button:
  - The "Load Facts" button will be replaced by the text "Loading..."
    - You can include an animated spinner image if you like, but the button must still be replaced by the text above, in addition to any image
  - A RESTful service call will be made to a service you write ( see "Services" below)
- Once the service called by pressing "Load Facts" has loaded:
  - The "Loading..." message will be removed  
  - The "Load Facts" button will NOT reappear
  - The "0 facts loaded" message will be updated to show the number of facts loaded
  - An additional message saying "Showing Facts X - Y" will appear
    - X will be the start number of the currently shown facts (example: the 11 in "Showing Facts 11-20")
    - Y will be the end number of the currently shown facts (example: the 10 in "Showing Facts 1-10")
  - The appropriate number of Facts will be displayed (based on the "Facts per page" and starting by starting at fact 1)
  - New buttons "Previous" and "Next" appear (see below)
- The "Showing Facts" message
  - Will show the numbers of the facts shown, starting at the current start, and ending at the current end
  - The current start can never be less than 1
  - The current end can never be more than the number of possible facts
    - Example: If there are 26 total facts, the end number of shown facts can never be higher than 26
- When the option in the "Facts per page" dropdown is changed
  - Any shown facts re-orient to be starting at the _current_ start, and go to the new endpoint
    - Example: if currently showing 1-10 and the Facts per page is changed to 5, it will now show 1-5
    - Example: if currently showing 6-10 and the facts per page is changed to 10, it will now show 6-15
    - Example: if currently showing 6-15 and the Facts per page is changed to 5, it will now show 6-10
- The Previous and Next buttons:
  - Each is enabled only if there are facts not currently shown that that end of the list
    - Example, if you have 26 facts and are currently showing "21-26", the "Next" button is disabled
    - Example, if you are showing facts "1-5", the "Previous" button is disabled
  - When clicked, the Previous/Next buttons change the numbers of the shown Facts
    - Normally this means going back/forward by the number of "Facts per page", but there are special cases
      - Example: If the page is showing facts 6-10, and the "Facts per page" is changed to 10, it will show facts 6-15.  Pressing Previous on the page showing 6-15 would show 1-10, while pressing Next on the page showing 6-15 would show facts 16-25, but pressing Previous on the page showing 6-15 would show 1-10. 

### Services
- You will write a RESTful service to return a list of facts
  - You must provide at least 21 facts, but you can provide more.
    - https://gist.github.com/Aetheryx/0ec1e3bb0b370a075d2080c6f673d294 is a valid source of facts to download and use
  - You can hold the facts you choose in JS or JSON on your server, but they should be in a separate file you require()
  - Your server must wait at least 3 seconds before responding with the list of facts
    - Hint: use a setTimeout() to call the `res.json(...)` response after a delay

### Visuals

* Your app and interactions should be attractive and usable
  - Note: Effort must happen here!  Minimal CSS is not sufficient
* The functionality should be understandable and discoverable

### Code
* Your code (server-side and client-side) should show good separation of concerns
* Your CSS should not use names to describe the appearance
* Your JSX should be in small, targeted components and follow the best practices from class.
* Non-presentation logic (such as service calls) should be in pure JS files without JSX with functions imported into components as needed

## Allowances
* You may create your generated HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class
* You may add icons and background images but there is no requirement to do so
* You may provide additional visual feedback (e.g. messages) for the user
* You are welcome to reuse previous code, particularly for the services, but make sure you are meeting all the requirements

## Restrictions
* All JSX files should have the .jsx extension, all vanilla JS files should have the .js extension
* Do not query the DOM for for matching nodes
* Do not modify the DOM except via React
* Do not use external JS outside of express, nodemon, and what create-react-app installs
* All data to/from services should be JSON, in query params, or in the path of the URL
* Do not use external CSS libraries (except for icon libraries if desired - no JS!)
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any files in your PR except for the assignment (no files in other assignment directories, for example)
* Do not use var
* Do not use alert, prompt, or the HTML dialog element
* Do not use terrible variable names
* Do not have console.log debugging messages or commented out code
* Do not use localStorage/sessionStorage/IndexedDB
* Do not use redirects
* Do not use document.cookie
* Use CSS and classnames to apply visual changes
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
