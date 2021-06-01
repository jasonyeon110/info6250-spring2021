# Exam 1

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'exam1' (`git checkout -b exam1`)
* Modify the `questions.md` file to have the answers required
* Add a `server.js`, a `words.js`, and any other files necessary to create the multiple page web application below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s).  
* Due by 11:59pm (PT) Sun Feb 28

## Goal and Requirements

* Did you remember the above requirement about `questions.md`?

The application will be a game to guess a word.

The User will enter a word, and the page will do one of:
* Say the word is not one of the permitted words and allow them to enter a new word
* Say the word has been previously guessed and allow them to enter a new word
* Display that the user has correctly guessed the word and allow them to start a new game
* Say how many letters the word has in common with the word they are trying to guess, without regard to position or case-sensitivity  (See "Examples" below), and increment the turn counter

## Requirements

### Visuals
* The game will display the list of previously guessed words for this word, as well as their number of "matching" letters
* The game will display the number of accepted guesses made (turns taken, not counting invalid or repeated words)
* The game will display the list of valid words to guess
  * This list will be scrollable if it cannot fit in the space available
* The game will show effort to make it visually attractive and usable.

### Logic
* The game will use a `words.js` that exports an array of valid words.  
* The game will work if the `words.js` file is replaced by a different list of words.  All words in any version of the file will be the same length as the other words in that file.
* The words.js file should ONLY export an array of valid words
* The game will not care about case-sensitivity.  The game will call a letter a match, even if the letter is in a different position in the word (see "Examples" below)
* The server will console.log the current secret word at the start of the game.  The client(browser) should never know the secret word until it is guessed. 
  * Hint: The server will have to store the secret word in the session, and not send the secret word to the browser.
* The game must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
* The server should work for multiple players, each playing their own games that may last different durations and are not impacted by other players.  
  * Assume each user is using a different browser or different browser profile - they will not be sharing cookies
  * This means you will have to have users log in
  * Do NOT include passwords, just accept a username to login
  * This means that the server will store different "game" information for each user
* No information should be sent to the clients that allow them to learn the secret words they are trying to guess outside of guessing.

### Examples

If `words.js` has the words "TEA, EAT, TEE, PEA, PET, APE" and the game selects TEA as the secret word then:
* TREE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* ATE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* PET will respond with 2 matches and increment the turn counter then allow a new guess
* TEE will respond with 2 matches and increment the turn counter then allow a new guess
* tee will respond with 2 matches and increment the turn counter then allow a new guess
  * But if they had previously guessed TEE, they will get a warning about a repeated guess and the turn counter will not increment
* EAT will respond with 3 matches and increment the turn counter then allow a new guess
* TEA will respond that they have won the game in however many turns and allow them to start a new game with a new randomly selected word from the list

## Allowances
* You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class and the Restrictions below
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You should use `express`, `cookie-parser`, and `uuid` modules only
* You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
* You must use the correct HTTP methods (GET for loading pages, POST for adding content)
* Reloading a page should not trigger a POST (use a redirect)
* Do not use external JS other than base express and cookie-parser
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* Do not have any files in your PR except for the exam (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use Map() or Set() for this exam
  * In order to ensure you use objects and arrays correctly
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
  * The console.log to show the secret word is allowed and required
* Do not have commented out code
* Do not use client-side(browser) JS
* Do not use localStorage
* Do not use meta tag refreshes
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

