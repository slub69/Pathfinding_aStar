On initialization the user is brought before input feilds and buttons. To start the program first select Maze or Random World. Then enter the desired size into the
Height and Width fields. Once that is complete press the start world button. The program will execute and a game world will be generated. Now the user must select
a start and a end point, using delete if they want to change their choice. Once the start and end is established the user must select if the pathfinder can use
diagonal movements or strictly linear movements by selecting of deselecting the diagonals checkbox. After all the selections have been made the user may press 
the Run Search button and watch as the power of math goes from the start to the end.


I started this project after seeing a YouTube video about how Google Maps and pathfinding in general works. I became curious and after some research decided to try to create my own program.
At the time I had known basics of Python and JavaScript, but wanted to learn C++.
My original pathfinder works using DFS to find one of the more optimal (not always the best) paths from a start to an end point in a world of randomized walls.
I decided that my programed needed an extra step of complexity so I wanted to add a true maze that the pathfinder would have to solve.
Taking the oppurtunity, I wanted the maze generation algorithm to run in C++. A decision that would come to haunt me as I had not understood the difficutlies of interprocess communication.
Eventually, I was able to get the program to work with a randomized world and a maze both being options for the user.
 

The maze generation algorithm is almost a direct copy of Abe Pralle's work at Northern Arizona Uni, adjusted to work within my program. 
