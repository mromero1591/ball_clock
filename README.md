#Ball Clock Problem.

## How To Use Program.
1. Download source.js file onto your computer.
2. Make sure you have Node.JS installed.
3. Open your terminal.
4. Go to the directory where you saved source.js
5. Run the command `node source.js`
6. The commandline will prompt you to enter a number between 27 and 127. If your number if valid the program will run otherwise the program will terminate.


## Description.

In order to solve the Ball Clock Program I create the following data structures a stack and queue.

Since the program was going to be adding to end and removing from the front ball when working with the ball container, I used a queue to hold each of the balls.

Since the min, five min, and hour arms were going to have a first in last out model for each of the balls a stack made more sense to me.

Once i had those structres ready I went ahead and created a start clock function that would take a ball amount, and run the clock untill those balls had rotate back to their inital state. Each time a ball moved from the queue to the min hand I increased the min count, this min count continued to increase untill the inital state of the queue was set. Once that state was met I was able to find the total days it took to get to the inital state by taking min / (total hours in a day * total min in an hour.)

In order to get the computation I started a console time before starting the clock and then ended the timer after the number of days were found.