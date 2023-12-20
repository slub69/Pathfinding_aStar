const DOMselectors = {
    runSearch: document.getElementById('run_btn'),
    randomizeWorld: document.getElementById('random_btn'),
    startWorld: document.getElementById('start_btn'),
    checkbox: document.getElementById('checkbox'),
    origin: document.getElementById('Origin'),
    endpoint: document.getElementById('Endpoint'),
    barrier: document.getElementById('Barrier'),
    autopath: document.getElementById('autoPath'),
    delete: document.getElementById('Delete'),

}



//start by defining all global variables as empty
let canvas = null //define world, call it canvas
let ctx = null //??
let referenceSheet = null //call in reference for images
let referenceSheetloaded = false //set a variable to give the status of the reference image
let world = [[]] //generate a 2d array for the world

let create = null //globalize variable for custom world or nah (originially used for start up but not used anymore)
let userSelection = null //globalize variable for which point the user has selected
let autoPath = null
let start = false
let end = false
//size of world in units of tiles
let worldWidth = 48
let worldHeight = 16

//size of each tile in pixels
let tileWidth = 32
let tileHeight = 32

//generate the start,end,and current of the path
let pathStart = []
console.log('initial path start ' + pathStart)
let pathEnd = []
let currentPath = []


function onload(){
    console.log('Starting Program...\n')    //show that the javascript and html is connected
    canvas = document.getElementById('gameWorld') //pull canvas from html
    canvas.width = worldWidth * tileWidth //make the world as big as the number of piles in pixels
    canvas.height = worldHeight * tileHeight //same as above but for height
    canvas.addEventListener('click', canvasClick, false)//???
    if (!canvas){
        console.log('Error loading canvas')
    }
	ctx = canvas.getContext("2d");
	if (!ctx){
        console.log("Error connecting canvas")
    }
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
        if(create===true){
            for (let x=0; x < worldWidth; x++){
		         for (let y=0; y < worldHeight; y++){
			        if (Math.random() > 0.75)
			        world[x][y] = 1;
                    }
	            }
            }


    //at this point we have defined an empty world by defining the world as an array nested inside an array, the arrays are full of 0 representing each node value
   generate()
   //start to find an intial path   
   
/*    currentPath = [] //clear current path incase rerun
   console.log('0 = ' + currentPath.length)
   //while(currentPath.length === 0){ //randomly generate a start
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	if (world[pathStart[0]][pathStart[1]] == 0){//in the event that the start and end are right next to each other than the solution has been found
		currentPath = findPath(world,pathStart,pathEnd);
	}
   //}
   //once a random start has been found
   redraw()//continue to next function
 */

}
function generate(){
    if(!referenceSheetloaded){ //if the reference sheet did not load then break b/c cannot draw
        return
    }
    console.log('World: ' + world)
    console.log('drawing...')
    let imageNum = 0
    ctx.fillStyle = '#000000'//set the world to be a black screen
    ctx.fillRect(0,0,canvas.width,canvas.height)//clear the "math world" and set the array to be 0 again
    for(x = 0;x<worldWidth;x++){
        for(y=0;y<worldHeight;y++){
                switch(world[x][y]){//set up a function for world to be "true or false" if true than sprite num is 0 and the sx , sy = 0 (special case)
                    case 1:
                        imageNum = 1; //the sprite num will be used throughout to pull the images from the reference image
                        break;
                    case 2:
                        imageNum = 2 //start pnt
                        break
                    case 3:
                        imageNum = 3 //end pnt
                        break
                    case 4:
                        imageNum = 4 //path tile
                        break
                    default:
                        imageNum = 0 //empty tile    
                        break;
            }
            ctx.drawImage(referenceSheet,
                imageNum*tileWidth, 0,
                tileWidth, tileHeight,
                x*tileWidth, y*tileHeight,
                tileWidth, tileHeight)
            // ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
        }//at this point the world has been drawn using the reference img
    }
}

function generatePath(){
    //while(currentPath.length === 0){ //randomly generate a start
    console.log('generating')
    currentPath = []
    currentPath = findPath(world, pathStart, pathEnd)
    console.log('Generate path: ' + currentPath)
    for(rp = 0; rp<currentPath.length;rp++){
        spriteNum = 4
        ctx.drawImage(referenceSheet,
            spriteNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight);
    }
    console.log('Path length: ' + currentPath)
    //now we will add an option to draw the path
/*     if(autoPath===true){//auto 
        pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	    pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	    console.log(pathStart + ' ' + pathEnd)
        for(rp=0;rp<currentPath.length;rp++){//add button for this function
            if(rp===0){
                imageNum = 2 //start tile
                
            } else if(rp===currentPath.length-1){
                imageNum = 3 //end tile
            } else{
                imageNum = 4 //path tile
                
            }
            ctx.drawImage(referenceSheet,//draws the path on top of the img
            imageNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight)
        }
    } else{
        for(rp=0;rp<world.length;rp++){//add button for this function
            if(world = 0){
                imageNum = 2 //start tile

            } else if(rp===currentPath.length-1 & userSelection==='endpoint'){
                imageNum = 3 //end tile
                
            } else{
                imageNum = 4 //path tile
                
            }
            ctx.drawImage(referenceSheet,//draws the path on top of the img
            imageNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight)
        } */

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
		} 

    }*/
}


/* function redraw(){
    if(!referenceSheetloaded){ //if the reference sheet did not load then break otherwise cannot draw
        return
    }
    console.log('Drawing World...')
    let imageNum = 0
    ctx.fillStyle = '#000000'//set the world to be a white screen
    ctx.fillRect(0,0,canvas.width,canvas.height)//clear the "math world" and set the array to be 0 again
    
    for(x = 0;x<worldWidth;x++){
        for(y=0;y<worldHeight;y++){
            if(custom===false){
            switch(world[x][y]){//set up a function for world to be "true or false" if true than sprite num is 0 and the sx , sy = 0 (special case)
                    case 1:
                        imageNum = 1; //the sprite num will be used throughout to pull the images from the reference image
                        break;
                    default:
                        imageNum = 0;
                        break;
            }} else{
                imageNum = 0
                break
            }
            ctx.drawImage(referenceSheet,
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
		} 
        ctx.drawImage(referenceSheet,//draws the path on top of the img
            imageNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight)
    }
} */
//add function here to deal with using interactions (click events)
function canvasClick(e){
    let x,y
    if(e.pageX != undefined && e.pageY != undefined){//check if html page coords are real and then find them
        x = e.pageX
        y = e.pageY
        console.log('click coords = ' + x + y)
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
    if(world[cell[0]][cell[1]] != 1){
        if(userSelection === 2 && start != true){//start
            world[cell[0]][cell[1]] = 2
            start = true
            pathStart = cell
        }else if(userSelection === 3 && end != true){//end
            world[cell[0]][cell[1]] = 3
            end = true
            pathEnd = cell
        }else if(userSelection === 1){//barrier
            if(world[cell[0]][cell[1]] === 2){
                start = false
            }else if(world[cell[0]][cell[1]] === 3){
                end = false
            }
            world[cell[0]][cell[1]] = 1 
        }else if(userSelection === 0){
            if(world[cell[0]][cell[1]] === 2){
                start = false
            }else if(world[cell[0]][cell[1]] === 3){
                end = false
            }
            world[cell[0]][cell[1]] = 0
        } 
    }else if(world[cell[0]][cell[1]] === 1){
        if(userSelection === 0)
        world[cell[0]][cell[1]] = 0//empty
    }
    generate()
}

function findPath(world, pathStart, pathEnd)
{
	// shortcuts for speed
	let	abs = Math.abs;
	let	max = Math.max;
	let	pow = Math.pow;
	let	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy is you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	let maxWalkableTileNum = 0;
    let destinationReached = 3
	// keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
	// it must have equal height and width. If your game world is rectangular, 
	// just fill the array with dummy values to pad the empty space.
	let worldWidth = world[0].length;
	let worldHeight = world.length;
	let worldSize =	worldWidth * worldHeight;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	let distanceFunction = ManhattanDistance;
	let findNeighbours = function(){}; // empty

    function canWalkHere(x, y)
	{
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

    
    /*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	let distanceFunction = DiagonalDistance;
	let findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	let distanceFunction = DiagonalDistance;
	let findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	let distanceFunction = EuclideanDistance;
	let findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	let distanceFunction = EuclideanDistance;
	let findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal)
	{	// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
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
        console.log(myN)
		if(myN){
		result.push({x:x, y:N});
        }
		if(myE){
		result.push({x:E, y:y});
        }
        if(myS){
		result.push({x:x, y:S});
        }
        if(myW){
		result.push({x:W, y:y});
        }
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        console.log(result)
		return result;
	}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		let newNode = {
			// pointer rto another Node object
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

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		let	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		let mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		let AStar = new Array(worldSize);
		// list of currently open Nodes
		let Open = [mypathStart];
		// list of closed Nodes
		let Closed = [];
		// list of the final output array
		let result = [];
		// reference to a Node (that is nearby)
		let myNeighbours;
		// reference to a Node (that we are considering now)
		let myNode;
		// reference to a Node (that starts a path in question)
		let myPath;
		// temp integer variables used in the calculations
		let length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
                    console.log('res '+ result)
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path -is possible
	return calculatePath();

} // end of findPath() function

/* function findPath(world, pathStart, pathEnd){//writing the actual a* pathfinding alogrithm
	let	abs = Math.abs;
	let	max = Math.max;
	let	pow = Math.pow;
	let	sqrt = Math.sqrt;

    
    let WalkableTileNum = 0 //since the world is represented by a bunch of 0 anything higher than 0 is block

    let worldWidth = world[0].length //the mathematical width of the world is the length of the internal array which represents the x axis
    let worldHeight = world.length//the mathematical height of the world is the length of the world array which is the same as the y axis
    let worldSize = worldWidth * worldHeight //area of the world
    //the mathematical representation of the world is now also defined
    let distanceFunction = DistanceCalc
    function DistanceCalc(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
        
        //return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}
    let findNeighbours = DiagonalNeighboursFree

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

    function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

    //now we will define all of the different rule sets using math
    function canWalkHere(x,y){
        return(
                (world[x] != null) &&//if the x coord is not empty
                (world[x][y] != null) &&//if the y coord is not empty
                (world[x][y] <= WalkableTileNum)//if the y coord is within the world
        )
        }

    
    function Node(Parent, Point){
        let newNode = {
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
        let tilePathStart = Node(null, {x:pathStart[0],y:pathStart[1]})//defines start node since this is the first node it does not have a parent node
        let tilePathEnd = Node(null, {x:pathEnd[0],y:pathEnd[1]})//defines the end tile (also no parent node)

        let AStar = Array(worldSize) // creates an array the size of the world (conatins all nodes in the world)

        let Open = [tilePathStart] //Set of open tiles starts the start tile

        let Closed = []//the list of known closed tiles starts empty

        let result = []//final output array

        let tileNeighbours//creates a variable to the tile neighbours will be defined later as search is done and neighbours are found

        let tileNode
        let tilePath

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

            tileNode = Open.splice(min, 1)[0]//defines knew node as node with lowest cost value (f)
            if(tileNode.value === tilePathEnd.value){//check if destination has been reached
                tilePath = Closed[Closed.push(tileNode) - 1]
                do{
                    result.push([tilePath.x, tilePath.y])
                    console.log(result)
                }
                while(tilePath = tilePath.parent)
                AStar = Closed = Open = []//clear the working arrays
                result.reverse()//return start to finsih not finsih to start
            }else{ //destination has not been reached
                tileNeighbours = Neighbours(tileNode.x,tileNode.y)
                for(i=0,j=tileNeighbours.length;i<j;i++){//loop through length of neighbours array (check every neighbour)
                    tilePath = Node(tileNode,tileNeighbours[i])
                    if(!AStar[tilePath.value]){
                    tilePath.g = tileNode.g + distanceFunction(tileNeighbours[i],tileNode)//current cost of current route
                    
                    tilePath.f = tilePath.g + distanceFunction(tileNeighbours[i],tilePathEnd)//check cost of entire path

                    Open.push(tilePath)//add the path to open to test

                    AStar[tilePath.value] = true //mark this path as already having been visited
                    }
                }
                Closed.push(tileNode)//add this node to be used in another potentially better path
            }
        }//keep working until entire open list is empty
        return result
    }
    return calculatePath()
}//Path has been found
 */

DOMselectors.randomizeWorld.addEventListener('click', function(){
    console.log('Generating world... \n')
    createWorld()
})
DOMselectors.startWorld.addEventListener('click', function(){
    console.log('Starting world...')
    onload()
})
 DOMselectors.checkbox.addEventListener('click', function(){
    if(checkbox.checked===true){
        create = true
    } else{
        create = false
    }
    console.log(checkbox.checked)

}) 
DOMselectors.origin.addEventListener('click', function(e){
    if(e.target.checked===true){
        userSelection = 2
    }
})
DOMselectors.endpoint.addEventListener('click', function(e){
    if(e.target.checked===true){
        userSelection = 3
    }
})
DOMselectors.barrier.addEventListener('click', function(e){
    console.log(e.target.checked)
    if(e.target.checked===true){
        userSelection = 1
    }
})
DOMselectors.delete.addEventListener('click', function(e){
    console.log(e.target.checked)
    if(e.target.checked===true){
        userSelection = 0
    }
})
DOMselectors.runSearch.addEventListener('click', function(){
    generatePath()
})
/* DOMselectors.autopath.addEventListener('click', function(){
    if(autopath.checked===true){
        autoPath = true
    } else{
        autoPath = false
    }
    console.log(checkbox.checked)}) */