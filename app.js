const DOMselectors = {
    runSearch: document.getElementById('run_btn'),
    randomizeWorld: document.getElementById('random_btn'),
    startWorld: document.getElementById('start_btn'),

}

//start by defining all global variables as empty
let canvas = null //define world, call it canvas
let ctx = null //??
let referenceSheet = null //call in reference for images
let referenceSheetloaded = false //set a variable to give the status of the reference image
let world = [[]] //generate a 2d array for the world

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


function onload(){
    console.log('Starting Program...\n')    //show that the javascript and html is connected
    canvas = document.getElementById('gameWorld') //pull canvas from html
    canvas.width = worldWidth * tileWidth //make the world as big as the number of piles in pixels
    canvas.height = worldHeight * tileHeight //same as above but for height
    canvas.addEventListener('click', canvasClick, false)//???
    referenceSheet = new Image() //define reference sheet as an image
    referenceSheet.src = 'reference_images.png'//set reference sheet to the image file provided
    referenceSheet.onload = loaded //let the program know that the reference sheet has been found and connected
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
    for (var x=0; x < worldWidth; x++){
		    for (var y=0; y < worldHeight; y++){
			    if (Math.random() > 0.75)
			    world[x][y] = 1;
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

function redraw(){
    if(!referenceSheetloaded){ //if the reference sheet did not load then break otherwise cannot draw
        return
    }
    console.log('Drawing World...')
    let imageNum = 0
    ctx.fillStyle = '#000000'//set the world to be a white screen
    ctx.fillRect(0,0,canvas.width,canvas.height)//clear the "math world" and set the array to be 0 again
    for(x = 0;x<worldWidth;x++){
        for(y=0;y<worldHeight;y++){
            switch(world[x][y]){//set up a function for world to be "true or false" if true than sprite num is 0 and the sx , sy = 0 (special case)
                    case 1:
                        imageNum = 1; //the sprite num will be used throughout to pull the images from the reference image
                        break;
                    default:
                        imageNum = 0;
                        break;
            }
            ctx.drawImage(spritesheet,
                imageNum*tileWidth, 0,
                tileWidth, tileHeight,
                x*tileWidth, y*tileHeight,
                tileWidth, tileHeight)
            // ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
        }//at this point the world has been drawn using the reference img
    }
    console.log('Path length: ' + currentPath)
    //now we will add an option to draw the path
    for(rp=0;rp<currentPath.length;rp++){//add button for this function
        if(rp===0){
            imageNum = 2 //start tile
            break
        } else if(rp===currentPath.length-1){
            imageNum = 3 //end tile
        } else{
            imageNum = 4 //path tile
            break
        }
/*      switch(rp) this is same as above if else but using switch
		{
		case 0:
			imageNum = 2; // start
			break;
		case currentPath.length-1:
			imageNum = 3; // end
			break;
		default:
			imageNum = 4; // path node
			break;
		} */
        ctx.drawImage(spritesheet,//draws the path on top of the img
            imageNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight)
    }
}
//add function here to deal with using interactions (click events)
function canvasClick(e){
    let x
    let y
    if(e.pageX != undefined && e.pageY != undefined){//check if html page coords are real and then find them
        x = e.pageX
        y = e.pageY
    }else{ //if html coords are undefined scroll to where they are defined
        x = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft

        y = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop
    }
    x -= canvas.offsetLeft //make the coords relative to the canvas 
    y -= canvas.offsetTop

    let cell = //find the coords in the canvas that we clicked
    [
        Math.floor(x/tileWidth),
        Math.floor(y/tileHeight)
    ]
    console.log('Tile clicked was ' + cell[0]+' , '+cell[1])

    pathStart = pathEnd
    pathEnd = cell
    currentPath = findPath(world,pathStart,pathEnd)
    redraw()
}


function findPath(world, pathStart, pathEnd){//writing the actual a* pathfinding alogrithm
    let maxWalkableTileNum = 0 //since the world is represented by a bunch of 0 anything higher than 0 is block

    let worldWidth = world[0].length //the mathematical width of the world is the length of the internal array which represents the x axis
    let worldHeight = world.length//the mathematical height of the world is the length of the world array which is the same as the y axis
    let worldSize = worldWidth * worldHeight //area of the world
    //the mathematical representation of the world is now also defined


    //now we will define all of the different rule sets using math

	function distanceFunction(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return Math.sqrt(Math.pow(Point.x - Goal.x, 2) + Math.pow(Point.y - Goal.y, 2));
	}
    let findNeighbours = NeighboursFree
    function Neighbours(x, y)
	{
		let	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}
    function NeighboursFree(tileNorth, tileSouth, tileEast, tileWest, North, South, East, West, result){
        tileNorth = North > -1 //???
        tileSouth = South < worldHeight
        tileEast = East < worldWidth
        tileWest = West > -1
        if(tileEast){
            if(tileNorth & canWalkHere(East, North)){
                result.push({x:East, y:North})
            } else if(tileSouth & canWalkHere(East, South)){
                result.push({x:East, y:South})
            }
        } else if(tileWest){
            if(tileNorth & canWalkHere(West, North)){
                result.push({x:West, y:North})
            } else if(tileSouth & canWalkHere(West, South)){
                result.push({x:West, y:South})
            }
        }
    }
    function canWalkHere(x,y){
        return(
                (world[x] != null) //if the x coord is not empty
                & (world[x][y] != null) //if the y coord is not empty
                & (world[x][y] <= maxWalkableTileNum)//if the y coord is within the world
        )
    }
    
    function Node(Parent, Point){
        var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
    }

    function calculatePath(){
        console.log(pathStart)
        let tilePathStart = Node(null, {x:pathStart[0],y:pathStart[1]})//defines start node since this is the first node it does not have a parent node
        let tilePathEnd = Node(null, {x:pathEnd[0],y:pathEnd[1]})//defines the end tile (also no parent node)

        let aStarWorld = new Array(worldSize) // creates an array the size of the world (conatins all nodes in the world)

        let Open = [tilePathStart] //Set of open tiles starts the start tile

        let Closed = []//the list of known closed tiles starts empty

        let result = []//final output array

        let tileNeighbours//creates a variable to the tile neighbours will be defined later as search is done and neighbours are found

        let myNode
        let Path

        let length, max, min, i, j

        while(length = Open.length){//iterate trhough the list of known open tiles
            max = worldSize
            min = -1
            for(i=0;i<length;i++){
                if(Open[i].f < max){
                    max = Open[i].f
                    min = i
                }
            }

            myNode = Open.splice(min, 1)[0]//defines knew node as node with lowest cost value (f)
            if(myNode.value === tilePathEnd.value){//check if destination has been reached
                Path = Closed[Closed.push(myNode) - 1]
                while(Path = Path.parent){
                    result.push([Path.x,Path.y])
                }
                aStarWorld = Closed = Open = []//clear the working arrays
                result.reverse()//return start to finsih no finsih to start
            }else{ //destination has not been reached
                tileNeighbours = Neighbours(myNode.x,myNode.y)
                for(i=0,j=tileNeighbours.length;i<j;i++){//loop through length of neighbours array (check every neighbour)
                    Path = Node(myNode,tileNeighbours[i])
                    if(!aStarWorld[Path.value]){
                    Path.g = myNode.g + distanceFunction(tileNeighbours[i],myNode)//current cost of current route
                    
                    Path.f = Path.g + distanceFunction(tileNeighbours[i],tilePathEnd)//check cost of entire path

                    Open.push(Path)//add the path to open to test

                    aStarWorld[Path.value] = true //mark this path as already having been visited
                    }
                }
                Closed.push(myNode)//add this node to be used in another potentially better path
            }
        }//keep working until entire open list is empty
        return result
    }
    return calculatePath()
}//Path has been found


DOMselectors.randomizeWorld.addEventListener('click', function(){
    console.log('Generating world... \n')
})
DOMselectors.startWorld.addEventListener('click', function(){onload()})