const readline = require('readline');

//Problem ==========================
/*
The ball clock is a simple device which keeps track of the passing minutes by moving ball-bearings. 
Each minute, a rotating arm removes a ball bearing from the queue at the bottom, raises it to the top of the clock and deposits it on a track leading to indicators displaying minutes, five-minutes and hours. 
These indicators display the time between 1:00 and 12:59, but without 'a.m.' or 'p.m.' indicators. 
Thus 2 balls in the minute indicator, 6 balls in the five-minute indicator and 5 balls in the hour indicator displays the time 5:32.
*/


//Data Structures ==========================

/*
Bottom Ball Container: Queue
Mintues Track: Stack
5-Min Track: Stack
1-Hour Track: Stack
*/


//Implement a stack
class Stack {
    constructor(size) {
        this.items = [];
        this.size = size;
    }
    
    //Purpose: Add an item to the stack.
    //Params: item, the item to add to the stack
    //Outcome: if stack is not full then item is added to the stack.
    //Return: true, if item was added to the stack, false, if item was not added to the stack.
    push(item) {
        return this.isFull() ? false : this.items.push(item);
    }

    //Purpose: remove an item from the stack.
    //Params: None
    //Outcome: if the stack is not empty then the item at the top of the stack is removed.
    //Return: item, the item that was removed, if stack is empty return false;
    pop() {
        return this.isEmpty() ? false : this.items.pop();
    }

    //Helper Functions.

    //Purpose: Check to see if the stack if full
    //Params: None
    //Outcome: if stack is full then true is returned otherwise false.
    //Return: if the current size is equal to or greater then the capacity then reuturn true otherwise false.
    isFull() {
        return this.items.length >= this.size ? true : false;
    }
    
    //Purpose: Check to see if the stack if full
    //Params: None
    //Outcome: if stack is empty then true is returned otherwise false.
    //Return: if the current size of the items is 0 then return true otherwise false.
    isEmpty() {
        return this.items.length === 0 ? true: false;
    }
}

//Implement A queue
class Queue {
    constructor(size) {
        this.items = new Array(size);
        for(let i = 0; i < size; i++) {
            this.items[i] = i;
        }
    }

    //Purpose: Add an item to the end of the queue.
    //Params: item, the item to add to the queue.
    //Outcome: the queue is increased by 1.
    //Return: an int which is the new length of the queue.
    enqueue(item) {
        return this.items.push(item);
    }

    //Purpose: remove an item from the front of the queue
    //Params: none.
    //Outcome: the queue is decreased by 1.
    //Return: the item that was removed from the queue.
    dequeue() {
        return this.items.shift();
    }
}

//Implement the clock class.
class Clock {

    constructor(balls) {
        this.minArm = new Stack(4);
        this.fiveMinArm = new Stack(11);
        this.hourArm = new Stack(11);
        this.ballHolder = new Queue(balls);
        this.size = balls;
    }

    //Purpose: starts the clock running it for every min.
    //Params: none.
    //Outcome: moveTominArm function is called.
    //Return: none.
    runClock() {
        //remove the first item from the queue.
        let item = this.ballHolder.dequeue();

        //add item to the min arm.
        this.moveToMinArm(item);
    }

    //Purpose: Add an item the min arm stack
    //Params: item, the item to add to the stack.
    //Outcome: Stack is updated.
    //Return: none.
    moveToMinArm(item) {
        //if the min arm is not full then add the item to the min arm.
        if(!this.minArm.isFull()) {
            this.minArm.push(item);

        } else { //if the min arm is full then empty the arm and add the item to the five min arm.
            //empty the arm.
            while(!this.minArm.isEmpty()) {
                let tempItem = this.minArm.pop();
                this.ballHolder.enqueue(tempItem);
            }
            //add item to the five min arm.
            this.moveToFiveMinArm(item);
        }

    }

    //Purpose: Add an item the fiveMin arm stack
    //Params: item, the item to add to the stack.
    //Outcome: Stack is updated.
    //Return: none.
    moveToFiveMinArm(item) {
        //if the five min arm is not full then add the item to the fivemin arm
        if(!this.fiveMinArm.isFull()) {
            this.fiveMinArm.push(item);
        } else { //if the five min arm is full add the item to the hour arm.
            while(!this.fiveMinArm.isEmpty()) {
                let tempItem = this.fiveMinArm.pop();
                this.ballHolder.enqueue(tempItem);
            }
            this.moveToHourArm(item);
        }
    }

    //Purpose: Add an item the hour arm stack
    //Params: item, the item to add to the stack.
    //Outcome: Stack is updated.
    //Return: none.
    moveToHourArm(item) {
        //if the hour min arm is not full then add the item to the hour arm
        if(!this.hourArm.isFull()) {
            this.hourArm.push(item);
        } else { //if the hour arm is full empty the hour arm.
            while(!this.hourArm.isEmpty()) {
                let tempItem = this.hourArm.pop();
                this.ballHolder.enqueue(tempItem);
            }

            //add the last item to back to the queue.
            this.ballHolder.enqueue(item);
        }
    }

    //Purpose: checks to see if the queue is back to its original state.
    //Params: none
    //Outcome: none
    //Return: true, if the balls are back in their original location, otherwise false.
    inInitalState() {
        var end = this.ballHolder.items.length - 1;
        var stop = this.ballHolder.items.length / 2;
        //loop through the bottom queue check if the items are in their original place. if not return false.
        for(let i = 0; i < stop; i++) {
            if(this.ballHolder.items[i] != i || this.ballHolder.items[end] !== end ) {
                return false;
            }
            end--;
        }
        return true;
    }

    //Purpose: get the current size of the queue.
    //Params: None
    //Outcome: none
    //Return: the size of the array as an int.
    getCurrentSize() {
        return this.ballHolder.items.length;
    }
}

//Purpose: creates a clock and starts it.
//Params: int, the number of balls for the clock.
//Outcome: the number of days a clock takes to reutrn to its inital state is displayed.
//Return: none
function startClock(ballNumber) {
    //Create a new clock and set the inital state to false and the min to false
    let newClock = new Clock(ballNumber);
    let initialState = false;
    let days = 0;

    //start the computation timer.
    console.time('Computation Time:')

    //while the clock is not in its intial state run the clock program.
    while(!initialState) {
        //run the clock for each min.
        newClock.runClock();

        //once all the balls are back into the queue a full day has passed. Check inital state.
        if(newClock.getCurrentSize() == ballNumber) {
            //check if the clock is in its inital state.
            initialState = newClock.inInitalState();
            days++;
        }
    }    
    //print out the number of days it took to get back to the inital state, and the computation time.
    console.log(`${ballNumber} balls take ${days} days`);
    console.timeEnd('Computation Time:');
}

//Purpose: starts the ball clock program.
//Params: none.
//Outcome: if the correct number is given then the progam runs sucessfully.
//Return: none.
function startProgram() {

    //create a read stream.
    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //get the users input. if valid continue the program.
    read.question('The following program will run a ball clock simutaion.\nIn order to correctly function Please Enter a number between 27 - 127? ', (answer) => {
        if(answer >= 27 && answer <= 127) {
            startClock(answer);
        } else {
            console.log(`sorry ${answer} is not a valid input`);
        }
        read.close();
    });
}

//start the program.
startProgram();