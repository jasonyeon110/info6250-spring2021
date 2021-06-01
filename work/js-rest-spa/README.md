# REST & SPA

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-rest-spa' (`git checkout -b js-rest-spa`)
* modify the files in this directory to have the require features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by 11:59pm (PT) Sun Mar 14

## Goals and Requirements

This is similar to the `js-dom` project, except the storage will be managed server-side and the page (a SPA) will communicate via fetch() calls to REST services you write.

You will write a page that lists items in a store inventory.
- Each item will have a name and a quantity (shown as text)
- Each item will have a "-" button to the left of the quantity, and a "+" button to the right of the quantity.
  - The "+" and "-" should be buttons
  - Pressing "+" will increase the quantity by 1 (by telling the server to alter the quantity and re-rendering)
  - Pressing "-" will decrease the quantity by 1 (by telling the server to alter the quantity and re-rendering)
  - The "-" button will be disabled if the quantity is 0 (you cannot go negative in quantity)
    - Hint: In addition to setting `.disabled` to true/false, you can set the disabled property of the element during render
  - Hint: Do not add an event listener on every single list item
    - Place one event listener on the ancestor `<ol>` or `<ul>` element
    - read a dataset value from the target of the event (or related node) to know which itemId to modify
- Each item name will have an "X" next to it.
  - The "X" can be a button, or some other HTML element
  - Pressing X will delete the item from the list (by telling the server to remove the item and re-rendering)
- There is a text field and an "Add" button
  - If the text field is empty, the "Add" button is disabled
  - If the text field is populated, the "Add" button is enabled
  - Clicking the add button will add an item to the list with the text as the name and quantity 0
    - By telling the server to create the item and re-rendering
    - The text field will be set to empty when an item is added
- Your code can be used by running `npm install`, `node server.js`, and going to `http://localhost:3000/`

## Data Structure

Each item:
- is an object
  - inside another  object representing the entire inventory
  - the "itemId" (see below) is the key in inventory object, and the individual item object is the property (see Example)
- with `itemId`, `name`, and `quantity` as properties (you may elect to have additional properties if you wish)
  - The itemId can be a number or a UUID.  It should NOT be the name of the item.
  - However, it should NOT repeat, so even if you use numbers as the itemId, if the last one is deleted, the next one created will NOT recreate the old itemId.
    - Example: If I have inventory with itemIds 1, 2, and 3.  If I delete itemId 3, and then create a new item, it should NOT be created as itemId 3 or any itemId that has been previously used (since the server last restarted)

You may create your application with certain items already in the inventory, or start it with an empty inventory

### Example Data Structure

The inventory object might be:
```
{ 
  "1": { 
    itemId: "1",
    name: "Stuffed Mouse",
    quantity: 3,
  },
  "2": { 
    itemId: "2",
    name: "Laser Pointer", 
    quantity: 1,
  },
  "4": { 
    itemId: "4",
    name: "String",
    quantity: 2,
  },
  "5": { 
    itemId: "5",
    name: "Squeaky Toy",
    quantity: 0,
  },
}
```

# Server 
- This page will be served by an express server you write (static HTML, static CSS, static client-side JS, RESTful dynamic endpoints that produce JSON)
- There will be multiple RESTful endpoints on the server
  - These routes will use the method + path to identify the itemId being altered and what kind of alteration
    - For this assignment, any operation modifying a single item should always include the itemId in the path and use that to identify the item being modified.  Example: `PUT /items/4` 
    - Hint: Be sure to use the correct HTTP methods on your endpoints for the kind of operation you are performing
      - Example: POST for create, but PUT for replace
    - Hint: Be sure to use urls that represent resources, not actions
      - Example: `/items` is fine, `/addItem` is bad
  - Any details (such as name, quantity, etc) will be passed in the request body as JSON
    - You can decide the nature of the data you send in the request.  For example, you can decide if you are sending the new quantity (example: setting the quantity to 5) or instead sending the change in quantity (example: telling the server to add 1 to whatever it has for the quantity).  
  - Any response data will be in a JSON body
    - You may choose what data you elect to return.  For example, you might return the item object for the item modified, or you might return the entire inventory object.  
      - You must, however, return some object that indicates the new state.
- If the page is reloaded in the browser, the state will be reloaded from the server, reflecting any changes that had been made.
- If the server is restarted the state will return to the original state
- Whenever the server responds with an error, it should send some value (beyond the http status code) we will call an "error-code".  

## Client Logic
- Do NOT use the DOM to store state (use an object to hold the inventory and render the view from that state object whenever it updates)
  - You may use "data-(whatever)" values to store indexes, ids, or other ways to connect the elements to their data sources
- DO keep your state object in memory on the client even though it gets regularly updated/replaced by new data from the server.
- Use an IIFE and do not pollute the global scope
- The client must use the returned data on any service call to update its local copy of the state
- Achieve any visual differences from adding/removing classes
  - Do NOT add "style" attributes
  - disabling/enabling a button is not a visual difference, so that is not done via a class change
- The page should only reload if the user themselves does it, not because of your code
- Any error-codes sent by the server should be translated into a human-friendly message and displayed to the user.

## Security
- The server must not allow Injection attacks
  - You must properly allow only accepted characters 
    - You decide what is accepted, but show how you are filtering for only accepted characters
- The server must not accept anything that would create an invalid state
  - Every name must have at least 1 non-whitespace character
  - Every quantity must be 0 or higher
  - You should not allow duplicate names, regardless of case
    - Example: do not allow both "toy mouse" and "Toy Mouse"

## Visuals
- Any error messages that your server sends must be shown to the user
- If your fetch() is unable to reach the server your code must display a suitable message to the user
- Any messages shown to the user cannot be in the Console
- Make your application reasonably attractive
- Include enough space around items
- Have elements reasonably aligned
- Make it clear which buttons apply to which items
  - Hint: This could be done with different background colors for rows, or different background color on mouseover/hover, or by having a line separating the rows (such as the border-bottom or border-top)

## Additional Requirements
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Make sure your .js file(s) are clear and organized, not just a jumble of code
- Follow any suggestions previously given to you in code reviews
- Do NOT use Set() or Map() - just use a plain JS object
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage
- Do NOT interact with the browser url in your client-side JS, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, node_modules/, etc)
* Do not use external JS other than express itself
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

