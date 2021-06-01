const path = require('path');

const people = `
Ji Woong Yeon (Jason) |  001569480   | @Ji Woong Yeon(Jason) | jasonyeon110
Brett Ritter          |  ???         | @swiftone             | swiftone

`.split('\n').filter( truthy => truthy );

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
