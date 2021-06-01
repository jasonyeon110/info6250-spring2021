# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
 => We can think of a "URL representing a resource" as representing an object(noun) that we want to have an interaction with it. Such as 'computer', 'phone', 'student' and etc...  However if you write the URL with a verb such as 'add', 'multiply' and etc... these wouldn't be representing a resource.  These actions should be defined in the HTTP methods.  We can fix that issue by sending a params with the URL => '/items/${itemId} and also send the body with the HTTP method that definds the actions.

## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
=> when you run the fetch requrest like the example above, you will receive a promise object with only with the header but haven't recevied the body yet because it is the async.  To get the body of the object, we need to parse the body with .text().
 => fetch('/username').then(response => response.text()).then(username => console.log('user is named ${username}'));

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
  => It means that you are getting the state by using the querySelector directly from the HTML elements to update the web. If you are 'storing the state in the DOM', as your web gets complicated, and if you want to update one specific element, you have to update every single DOM that are related to the specific element, it will be painful and take long time to update your web.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
 => Single page web application, SPA is when the user comes to the website, the server loads only one page of HTML. And the user request a specific part of the web, the server only sends partial data and update the specific part of the web, without re-loading the whole page of the contents.
 => On the other side, multiple page web application, MPA is when the user click something on the webpage, the server redirect the whole page to the other HTML and reload the whole page. Therefore, its not popular theseday due to bad user experience, but usually MPA is used for Search Engine Optimization.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
 => Progressive Enhancement, PE, is that you use little bit of the client Javascript or don't even use the client JS on a web but still the web does all the basic website functions.  If an SPA uses the PE, the engineers have to write the codes extensibly more than an SPA that doesn't use PE, because they have to make sure that the web application works without the client JS same way as the web application with the client JS.  Basically double amount of works.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
 => REST and dynamic asset could be little bit similar in a way that it can update a specific part of the web in a SPA. HOWEVER, dynamic asset sends the response from the server right away when the user requrest the service, but the REST service is happening asynchronous, that when it receives the requrest, it sends the Promise object and when it is resovled, send the rest of the data to the client.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
 => You should never store password, anything sensitive and personal data, application state, big data.  For example, if you store the application state in the cookie when you are using multiple tabs open, your browser sends the cookie every time when you make a request to the server, but if you open another tab (different website, server), you also send the cookie that you received from the previous server and send to the recently openned server. That server won't recognize your cookie and there will be confusions.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
 //a function that fetches data vs a function that uses data//
 => First of all, if you define a function which takes fetched data, inside of the fetch method, it would be really hard to follow what the function is actually doing with the fetched data, like callback hell. And the other reason is that the fetch method is asynchronous function that returns the data later, So when you separate the function out from the fetch method, then you can save the fetched data into a variable and feed that variable to the function that uses the data. And last, fetch can return error and when that happens, you can save time by not running the function that uses the fetched data if you separate them.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
 => Try and Catch is useless in async errors because of the timing is different. Like the name of the 'asynchronous error', its not happening as in order of your code. a Promise executed later when the catch code was already ran. So try and catch is useless when you are dealing with async errors.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
 =>I would say Both for a Front-End and server-side should concern and consider about the separation of concerns. No matter what side you are writing the codes, you have to de-couple the codes from the other side. That means, when you change some codes on the front end(HTML), your service side codes shouldn't be effected by it.
