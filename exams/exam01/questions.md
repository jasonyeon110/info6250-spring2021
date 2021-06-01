# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
    => Static: You go to the website and get the well, pre-made HTML from the server and all contents are fixed.
       Dynamic: The web's contents can be changed based on users' request which provide more function to the web and more interactive than the static web.
## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
    => Absolute paths require the full path from the root and it will direct you to the same place.  Relative paths are based on your current location so you don't need the full path.
    => Document root is different than the file system root, and it contains all the files in the host's server.  And the absolute path is always point to the document root of the host server.
## Q: What is the difference between server-side and client-side JS?
    =>Server-side JS does all the database related works, such as Get, post, delete and etc... and clients won't see how and what is happening.
    =>Client-side JS is run on the client's browser and that provides dynamic experience to the clients.  
## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
    =>const can declare a variable that cannot be reassign and immutable.
    =>let can declare a variables that can be updated.
    =>const and let are block scoped. 
    =>when you use the 'var' to declare a variable, it can be mutable and also declared in globally.. Can be problematic.
## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
    => You can use a keyword 'new' to inherit all the properties from parent's constructor. 
    => You can use Object.create to create a new object that inherit the properties. 
    => use Object.setPrototpyeof method to bring all properties. 
    => use ES6 class that use the constructor function to inherit. 
## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
    =>  class Aniaml{
        constructor(name){
            this.name = name;
        }
        purr(){
            console.log("PPPPuuuurrrrrrr");
        }
    }

    const cat = new Animal("Momo");
    cat.purr();
## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
    =>  const animal = {
        purr: function(){
            console.log("PPPPuuurrrr");
        }
    }
    const cat = Object.create(animal);
    cat.purr();
## Q: Explain what a callback is, and give an example.
    =>callback function is the function that passed as an parameter of other function.
    ex) 
    function printNow(print){
    print();}

    printNow(()=> console.log('Hello'));

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `the Object before the dot(.)`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
    =>  If you name the classes what they look like, it would be easiler at the time you are working on it BUT when you want to maintain in the future, everything might look different.

    Bad example
    .blue{
        background-color: blue;
    }

    Good example
    .menu{
        border: 1px solid black;
    }