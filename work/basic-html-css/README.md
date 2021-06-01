# Basic HTML-CSS

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-html-css' (`git checkout -b basic-html-css`)
* Create the files described below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA and I as reviewers on the PR.  
* Due by Sun Feb 7 11:59pm (PT)

## Goal and Requirements

You will create files that will be viewed by running `serve` ( or `npx serve`) in this directory
  * You should assume the user has `serve` installed globally - you should not try to install it for them

The idea is to show some HTML pages that share styling, use semantic HTML, and use some form elements to pass data between them.

### Files

#### HTML files
Create three HTML files in this directory
  * one file is `students.html`
    * it loads the lists.css CSS file below using an ABSOLUTE path (but not fully qualified URL)
      * you will have to manage the path when loading the file since the css files are in a directory
    * The page will have a heading of "Great Lists"
    * the page will list "Star Students"
    * 5 "students" will be listed (you make up their names)
    * Each student name should be link to `details.html` (using a RELATIVE path) with an `id=somenumber` as a query param (you make up the value of 'somenumber')
      * Note that because our files are static this query param won't show any visual difference on the page, only in the browser url
  * one file is `cats.html`
    * it loads the lists.css CSS file below using an ABSOLUTE path (but not fully qualified URL)
      * you will have to manage the path when loading the file since the css files are in a directory
    * The page will have a heading of "Great Lists"
    * the page will list "Star Cats"
    * 5 "cats" will be listed (you make up their names)
    * Each cat name should be link to `details.html` (using a RELATIVE path) with an `id=somenumber` as a query param (you make up the value of 'somenumber')
      * Note that because our files are static this query param won't show any visual difference on the page, only in the browser url
  * one file is `details.html`
    * details.html should NOT load lists.css, and instead load details.css as described below 
    * details.html will have a semantic block with an error header and an error message
      * You decide how to indicate that semantic meaning - there is no existing HTML tag for errors
    * The error header is "Error"
    * The error message is "Sorry, I haven't learned dynamic content yet"
    * There will be two html forms on the page
      * One will be have an input box for "Favorite Student"
        * This input will have a `<label>` tag with the text "Favorite Student"
        * This form will have a button that says "See Star Students"
        * Submitting the form via the button will take you to `students.html?favorite=WHATEVERTHEYTYPED`
          * What they type will cause no visible difference on the page they see after they submit, only in the browser URL
      * One will be have an input box for "Favorite Cat"
        * This input will have a `<label>` tag with that text
        * This form will have a button that says "See Star Cats"
        * Submitting the form via the button will take you to `cats.html?favorite=WHATEVERTHEYTYPED`
          * What they type will cause no visible difference on the page they see after they submit, only in the browser URL.


#### CSS files
Create CSS files in the `css/` directory in this directory
  * one file should be `lists.css`
    * lists.css should work equally well for both cats.html and students.html
    * lists.css should not have different rules for those files - the rules should apply to both
    * The lists should render without bullet points
    * Each list should have a visible border
    * The list items should alternate between slightly darker/lighter background colors 
      * Hint: See https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
    * The text on the page should be set to a sans-serif font
  * one file should be `details.css`
    * Style the error header and error message to stand out
    * Style the two forms so they are side-by-side
    * Each form has the text input and label above their button 

#### Special Requirements
* Only one id attribute on a page
  * That id attribute is on a high level container and not on an internal element
* Use semantic HTML where possible
* Be sure to follow the best practices listed in class
* Be sure to follow the requirements listed in the work/ directory in your repo 
* Do not use any JS (client-side OR server-side) - this should HTML and CSS only
