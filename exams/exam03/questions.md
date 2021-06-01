# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)
  *=> I believe that complexity is our enemy, so when we are writing a function or JSX component, we should keep it simple as possible. And when you are writing a function/JSX component, don't try to put multiple logics into a function or JSX component and separate the different logic into other function or other files.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
  *=> When you use SPA by using React or any other frameworks, those SPA is based on JavaScript and many places don't use Progressive Enhancement(PE). So,, if a browser's JavaScript is disabled for some reason, the browser won't be able to show or do anything because SPA's(SPA that's not implementing PE) core foundation is JavaScript

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.
  *=> When the Dev Server(port: 3000) makes a '/service' request that are on the different server (port: 4000), it checks the proxy setting in the package.json. If the proxy was set to the correct port(4000), then when the request comes in from the dev server to the other server, it goes to the '/service' in 4000 and this server(4000) sends response back to the dev server(3000) with whatever the '/service' provide.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
  *=> After the 'npm run build', it creates a static folder inside of the build folder. At this point, you won't run your web on dev server(port:3000) like above but instead, the web will be run on the static server(port:4000). Therefore you won't need the proxy as above. Therefore, all the network calls are made through the static server(4000).

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
  *=> example code:
  ```
  function Loading ({ contentsState }) {
    let content = null;
    if (contentsState.isLoading) {
        // if (!true) {
        content =
            <div>
                <div className="loading">Loading...</div>
                <img src={loading} alt="" className="spinner" />
            </div>
    }
    return (
        <div>
            {content}
        </div>
    )
};
```
In this example, 'Loading' is a component in the App.jsx and getting the isLoading data from the parent. This Loading compnent can use that data to run some logics within the 'Loading' but cannot alter the 'isLoading' state, and even if somehow that isLoading state changes, but it won't render the page.  Therefore, the data can go down to child from parent, not the other way.

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.
  *=>  example code:
  ```
  function Loading ({ contentsState, setContentstate }) {
    let content = null;
    if (contentsState.isLoading) {
        // if (!true) {
        content =
            <div>
                <div className="loading">Loading...</div>
                <img src={loading} alt="" className="spinner" />
            </div>
    } else {
      setContentState({
        //change the state
        isLoading: true;
      })
    }
    return (
        <div>
            {content}
        </div>
    )
};
```

we can pass the setter, 'setContentsState', from the parent to the child then the child can use that setter to change the state.

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

  *=> For student record, I would perfer to make it an Object object. If you have multiple students in your database, it would be easiler to find a student with id,
```
const studentRecords = {
  654321:{id: "654321", name: "Bao", address: "123 Main Street"}, 
  654322:{id: "654322", name: "Jason", address: "123 Main Across Street "},
  654323:{id: "654323", name: "David", address: "321 Main Street"},
};
```

  *=> For Pizza-making-steps, I would make it an Array. Since order of making pizza step is important, an array would be easy to layout the order of the steps.
```
const pizzSteps = [
  {qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" },
  {qty: 5, ingredient: "peperoni", instructions: "spread over pizza"},
  ];
```


## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
 *=> The inheritance in JavaScript can occure in an object. The object has a prototype property and that prototype also has a prototype of its ownprototype and it goes on and on until it reaches null. 
 For example,
 ```
  let a = function(){
    this.num1 = 1;
    this.num2 = 2;
  };

  let pro = new a();  => The 'pro' is {num1:1, num2:2};
```
  a.protytpe.num3 = 3;

  and Now, pro variable has prototype of num3


## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.
  *=> It looks like this code is trying to catch if the user has inputted the username. If that's the case, this code has a bug, 'username == undefined' will be a problem because also 'username == null' would be true.

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
  *=> Decoupling is enforcing separation of concerns. For example, You should not hold any data in the server.js but put that data into a separate file and import that in the server.js to access it. OR modification of your HTML shouldn't effect any codes in the server.js. The beneficial of decoupling is manageable of the codes and also these codes will be reuseable.

## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.
  *=> First, we need to make div className ={isBackgroundOn ? 'white' : 'black'}. Then use the useState.  const [isBackgroundOn: setIsBackgroundOn] = useState(true); 
  after that, we set up a button (onClick) with a function (something like handleOnClick) that changes the state of isBackgroundOn = false; 
  In the CSS, we need to to setup both white and black background color. If everything was done correctly, we should be able to change the background color white to black or vise versa.

## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding
  *=> Checking the service code : when we are using the server (Promise objects), if something goes wrong with the server, we would 'catch' the error in the service and display the error messages in the console or actually show in the browser. And I usually use console.log in ther server side if something is not working well.  In this way, we would be able to see the locations of the problem occuring.
    Checking the React code: React shows very detail error messages if the code is not working or if it has any problems. I would pay close attention to that error message and go dive deep of the error message and understand the problem.

## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
```
import { useState } from 'react';
function Demo() {
  const [count, setCount] = useState(0);

  if (!count) { 
    setCount(1);
  }
  return (
    <div>{count}</div>
  );
}
```
  *=> It renders twice. First when the browser is loaded useState(0) will put the count = 0 and since "if(!count)" equals true, setCount sets the count = 1 and it renders again. the finaly count value will be 1.

## Q14: What happens with the below code when rendered and why?
```
import { useState, useEffect } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  
  useEffect( () => { 
    Promise.resolve().then( () => { 
      setCount(count + 1);
    });
  }, [count]);
  return (
    <div>{count}</div>
  );
}
```

 *=> The count will increase indefinitely, because of the [count] in useEffect hook and the Promise. When the page initialized, the page's count starts with 0 becuase of the Promise hasn't resolved that time and 'setCount(count +1)' has run. But after the first through, Promise Object resovled and setCount(count + 1) ran and becomes new state and count get render.  In the useEffect, if the [count]'s value updated, that becomes an another new state and the count gets rendered again. and Its keep going this loop over and over again. That's why the counts get increased indefinitely.

## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)
  *=>In the server-side, .json(...) takes an object or array and then convert those into JSON and response to the service call and send JSON to the client slide.
  In the browser-side, it would be a Promise object that received from the server that resolved. and then by using .json() we can read and parse the data.

## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)
  *=> The Browser is not involved and doesn't know what is going on after the 'fetch()'. Once the fetch is call on the browser, the server is doing all the work behind the scene, such as finding out the location of the services that browser is requesting. The browser is just calling fetch() and wait for the response to come back. Therefore, the browser's url will be the same even if the services are on a different server.

## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)
  *=> Basically you will face a CORS error if your are not allowed get the service from on a different origin server. If this occurs, you can make a request to the other server to get the CORS header and request to allow the services that you need. OR you can setup a proxy server to use the services.

## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

```
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```
  *=> The user will see the text 'Hello World'. Because when the browser naviagates to the /page/start, but this page directly redirect the url to '/page/end'.  That's why the user sees 'Hello World'.

## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?
  *=> In order to check the state of the web, the server generates session and the cookie and send the cookie to the user's browser and the browser stores the cookie. When the user is going through the website and make any request to the server, the server checks the cookie on the browser in order to check the user's state.

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?
  *=> Everyone can write working codes but that's not the end of the programming. Once you have working codes, you have to optimize, organize the codes so that any other programmers including future-yourself should be able to skim through your codes and able to easily understand what's happening with the codes without spending large amount of time.
  Also if you need to make an adjustment, it should be fairly easy to change your codes without breaking the app and the codes should be repeatable.


