const DOMselectors = {
    runSearch: document.getElementById('run_btn'),
    randomizeWorld: document.getElementById('random_btn'),
    startWorld: document.getElementById('start_btn'),
    checkbox: document.getElementById('checkbox'),
    origin: document.getElementById('Origin'),
    endpoint: document.getElementById('Endpoint'),
    barrier: document.getElementById('Barrier'),

}



//start by defining all global variables as empty
let canvas = null //define world, call it canvas
let ctx = null //??
let referenceSheet = null //call in reference for images
let referenceSheetloaded = false //set a variable to give the status of the reference image
let world = [[]] //generate a 2d array for the world

let custom = false //globalize variable for custom world or nah (originially used for start up but not used anymore)
let userSelection = null //globalize variable for which point the user has selected

//size of world in units of tiles
let worldWidth = 48
let worldHeight = 16

//size of each tile in pixels
let tileWidth = 32
let tileHeight = 32

//generate the start,end,and current of the path
let pathStart = [worldWidth,worldHeight]
console.log('initial path start ' + pathStart)
let pathEnd = [0,0]
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
    console.log(custom)
    for(x=0;x<worldWidth;x++){//for loop to loop through the size of the world and generate all of it
            world[x] = []//set each element of world to be empty (creates an empty world)
            for(y=0;y<worldHeight;y++){//same thing as for world width but now for height so the world is 2d
                world[x][y] = 0 // set the array inside the array to be empty
                }
            }
        for (let x=0; x < worldWidth; x++){
		    for (let y=0; y < worldHeight; y++){
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
   generate()
   //start to find an intial path
   
   generatePath()
   
   
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
    if(!referenceSheetloaded){ //if the reference sheet did not load then break otherwise cannot draw
        return
    }
    console.log('Drawing World...')
    let imageNum = 0
    ctx.fillStyle = '#c4c4c4'//set the world to be a white screen
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
            }} else if(custom===true){
                switch(world[x][y]){//set up a function for world to be "true or false" if true than sprite num is 0 and the sx , sy = 0 (special case)
                    case 1:
                        imageNum = 0; //the sprite num will be used throughout to pull the images from the reference image
                        break;
                    default:
                        imageNum = 0;
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
}
function generatePath(){
    currentPath = [] //clear current path incase rerun
    console.log('0 = ' + currentPath.length)
    //while(currentPath.length === 0){ //randomly generate a start
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
	if (world[pathStart[0]][pathStart[1]] == 0){//in the event that the start and end are right next to each other than the solution has been found
		currentPath = findPath(world,pathStart,pathEnd);
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
        ctx.drawImage(referenceSheet,//draws the path on top of the img
            imageNum*tileWidth, 0,
            tileWidth, tileHeight,
            currentPath[rp][0]*tileWidth,
            currentPath[rp][1]*tileHeight,
            tileWidth, tileHeight)
    }
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
	let	pow = Math.pow
	let	sqrt = Math.sqrt

    
    let maxWalkableTileNum = 0 //since the world is represented by a bunch of 0 anything higher than 0 is block

    let worldWidth = world[0].length //the mathematical width of the world is the length of the internal array which represents the x axis
    let worldHeight = world.length//the mathematical height of the world is the length of the world array which is the same as the y axis
    let worldSize = worldWidth * worldHeight //area of the world
    //the mathematical representation of the world is now also defined
    let distanceFunction = DistanceCalc
    function DistanceCalc(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
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
                (world[x][y] <= maxWalkableTileNum)//if the y coord is within the world
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
        console.log('Starting node cords ' + pathStart)
        let tilePathStart = Node(null, {x:pathStart[0],y:pathStart[1]})//defines start node since this is the first node it does not have a parent node
        let tilePathEnd = Node(null, {x:pathEnd[0],y:pathEnd[1]})//defines the end tile (also no parent node)

        let AStar = new Array(worldSize) // creates an array the size of the world (conatins all nodes in the world)

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
                while(tilePath = tilePath.parent){
                    result.push([tilePath.x,tilePath.y])
                }
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


DOMselectors.randomizeWorld.addEventListener('click', function(){
    console.log('Generating world... \n')
    createWorld()
})
DOMselectors.startWorld.addEventListener('click', function(){
    console.log('Starting world...')
    onload()
})
/* DOMselectors.checkbox.addEventListener('click', function(){
    if(checkbox.checked===true){
        custom = true
    } else{
        custom = false
    }
}) */
DOMselectors.origin.addEventListener('click', function(){
    console.log(origin.checked)
    if(origin.value==='on'){
        userSelection = 'origin'
    }
})
DOMselectors.endpoint.addEventListener('click', function(){
    console.log(endpoint.checked)
    if(endpoint.value==='on'){
        userSelection = 'endpoint'
    }
})
DOMselectors.barrier.addEventListener('click', function(){
    console.log(barrier.checked)
    if(barrier.value==='on'){
        userSelection = 'barrier'
    }
})