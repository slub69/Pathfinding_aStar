let canvas = null //define world, call it canvas
let ctx = null //??
let referenceSheet = null //call in reference for images
let referenceSheetloaded = false //set a variable to give the status of the reference image
let worldArray = [[]] //generate a 2d array for the world

//size of world in units of tiles
let worldWidth = 16
let worldHeight = 16

//size of each tile in pixels
let tileWidth = 32
let tileHeight = 32

//generate the start,end,and current of the path
let pathStart = [worldWidth,worldHeight]
let pathEnd = [0,0]
let currentPath = []

// ^^^ all variables have been defined now html page is run

function onload(){
    console.log('Connected...\n\n') //show that the javascript and html is connected
    canvas = document.getElementById('gameWorld') //pull canvas from html
    canvas.width = worldWidth * tileWidth //make the world as big as the number of piles in pixels
    canvas.height = worldHeight * tileHeight //same as above but for height
    canvas.addEventListener('click', canvasClick, false)//???
    referenceSheet = new Image() //define reference sheet as an image
    referenceSheet.src = 'reference_images.png'//set reference sheet to the image file provided
    referenceSheet.onload = loaded //???
}
function loaded(){//function that lets user and code know that the image has been linked
    console.log('Images have been loaded.')
    referenceSheetloaded = true
    createWorld()//after the image has been connected the code continues to set up the world and run the rest of the code
}
function createWorld(){
    console.log('Loading world...\n\n')//lets the user know that the next function has been started
    for(x=0;x<worldWidth;x++){//for loop to loop through the size of the world and generate all of it
        world[x] = []//set each element of world to be empty (creates an empty world)
        for(y=0;y<worldHeight;y++){//same thing as for world width but now for height so the world is 2d
        world[x][y] = 0 // set the array inside the array to be empty
        }
    }
    //at this point we have defined an empty world by defining the world as an array nested inside an array, the arrays are full of 0 representing each node value
    /* 
    add random button 

    for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < worldHeight; y++)
		{
			if (Math.random() > 0.75)
			world[x][y] = 1;
		}
	}

    */
   //start to find an intial path
   currentPath = []
   while(currentPath.length === 0){ //randomly start
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	if (world[pathStart[0]][pathStart[1]] == 0){//in the event that the start and end are right next to each other than the solution has been found
		currentPath = findPath(world,pathStart,pathEnd);
	}
   }
   //once a random start has been found
   redraw()//continue to next function
}