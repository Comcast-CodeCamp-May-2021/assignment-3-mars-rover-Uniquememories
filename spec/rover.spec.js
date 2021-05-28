const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here! //checks that Rover constructor sets all argument & default values for an instance of a Rover class
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382); 
      expect(rover.position).toEqual(98382); //position property is set to argument passed to the constructor (new Rover)
      expect(rover.generatorWatts).toEqual(110); //generatorWatts property is set to default
      expect(rover.mode).toEqual("NORMAL"); //mode property set to default
  });
  // 8 //check that Rover class has a method called receiveMessage that accepts an argument that is a message object
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("Test message with two commands", commands); //instance of the message class
    let rover = new Rover(98382); //instance of the rover class
    let response = rover.receiveMessage(message); //variable to assign the return from the receiveMessage, passing it the message instance created
      expect(response.message).toEqual('Test message with two commands'); //check that message property on the object returned from receiveMessage(response) matched the name property on the message instance
  });
  // 9 //checks that object returned by the receiveMessage in Rover Class contains a property called results => (an array holding more than one piece of info)
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("Test message with two commands", commands);  //instance of message class accepts command instances for its commands property
    let rover = new Rover(98382); //instance for rover class
    let response = rover.receiveMessage(message); //variable to assign the return from the receiveMessage, passing it the message instance created
      expect(response.results.length).toEqual(2); //check that the results property on object from receiveMessage matches the number of command class instances passed to the message class instance
  });
  //10 // Test 10 is testing that the code in your receiveMessage method is adding in an object into the results array.
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("Test message with STATUS_CHECK command", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
      expect(response.results[0].roverStatus.position).toEqual(98382);
      expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
      expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });
  //11 // The rest of these tests are testing your loop and if/else block you created to pass test 10! You just need to build more conditions onto the if/else block. Now instead of checking for the 'STATUS_CHECK' commandType, we are checking for the 'MODE_CHANGE' commandType.
  it("responds correctly to mode change command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("Change mode", commands);
    let response = rover.receiveMessage(message).results;
    // console.log(response);
      expect(response[0]).toEqual({completed: 'true'});
      expect(rover.mode).toEqual("LOW_POWER");
  });
  //12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message("Change mode", commands);
    let response = rover.receiveMessage(message).results;
    // console.log(response);
      expect(response[2]).toEqual({completed: 'false'});
      expect(rover.mode).toEqual("LOW_POWER");
  });
  //13
  it("responds with position for move command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message("Change mode", commands);
    let response = rover.receiveMessage(message).results;
    // console.log(response);
      expect(response[2]).toEqual({completed: 'false'});
      expect(rover.mode).toEqual("LOW_POWER");
  });
});











  /*  
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

expect a response that looks like this:
{
   message: 'Test message with two commands',
   results: [
      {
         completed: true
      },
      {
         completed: true,
         roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
      }
   ]
}
  */