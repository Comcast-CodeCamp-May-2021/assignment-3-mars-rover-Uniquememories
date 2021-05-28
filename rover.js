class Rover {
   constructor(position, mode, generatorWatts) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
   }
  
   receiveMessage(messageObject) {
    //  console.log(messageObject);
     let resultsArray = []
     let messageName = {
       message: messageObject.name,
       results: resultsArray
     };
     for (let i = 0; i < messageObject.commands.length; i++) {
       let commandObject = (messageObject.commands[i]);
         if (commandObject.commandType === "STATUS_CHECK") {
           let status = {
             completed: 'true',
             roverStatus: {
               mode: this.mode, 
               generatorWatts: this.generatorWatts, 
               position: this.position}
           }
          resultsArray.push(status);
          // console.log(commandObject.commandType);
         }// The rest of these tests are testing your loop and if/else block you created to pass test 10! You just need to build more conditions onto the if/else block. Now instead of checking for the 'STATUS_CHECK' commandType, we are checking for the 'MODE_CHANGE' commandType.
         else if (commandObject.commandType === "MODE_CHANGE") {
           this.mode = commandObject.value;
            let status = {
              completed: 'true',
            }
          resultsArray.push(status);
          // console.log(commandObject.commandType);
         }
         else if (commandObject.commandType === "MOVE") {
           if (this.mode === "LOW_POWER") {
             let status = {
               completed: "false" 
              //  Cannot move in low power mode.",
             }
            resultsArray.push(status);
            // console.log(commandObject.commandType);
           }
           else {
             this.position = messageObject.commands[i].value;
              let status = {
                completed: 'true',
              }
            resultsArray.push(status);
           }
         }
     }
     
     return messageName;
  }  
}

module.exports = Rover
