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
    console.log('searching...')
    let currentPath = findPath(world, pathStart, pathEnd)//find the mathematical path
    console.log(currentPath+'')
    generate()//draw path
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

function findPath(world, pathStart, pathEnd){
    grid = world
    src = pathStart
    dest = pathEnd
    ROW = worldWidth
    COL = worldHeight
    console.log('grid ' + grid + '\nsrc ' + src + '\ndest '+ dest)

	class cell {
        // Row and Column index of its parent
        // Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
        constructor(){
            this.parent_i = 0;
            this.parent_j = 0;
            this.f = 0;
            this.g = 0;
            this.h = 0;
        }
    }
    // A Utility Function to check whether given     (row, col)
    // is a valid cell or not.
    function isValid(row, col){// Returns true if row number and column number is in range
        return (row >= 0) && (row < ROW) && (col >= 0) && (col < COL);
    }
    
    // A Utility Function to check whether the given cell is
    // blocked or not
    function isUnBlocked(grid, row, col){
        // Returns true if the cell is not blocked else false
        if (grid[row][col] == 0)
            return (true);
        else
            return (false);
    }
    
    // A Utility Function to check whether destination cell has been reached or not
    function isDestination(row, col, dest, grid)
    {
        if (row == dest[0] && col == dest[1] || grid[row][col] == 3){
            return (true);
        }
        else{
            return (false);
        }
    }
    
    // A Utility Function to calculate the 'h' heuristics.
    function calculateHValue(row, col, dest)
    {
        // Return using the distance formula
        return (Math.sqrt((row - dest[0]) * (row - dest[0]) + (col - dest[1]) * (col - dest[1])));
    }
    
    // A Utility Function to trace the path from the source to destination
    function tracePath(cellDetails, dest)
    {
        console.log("The Path is ");
        let row = dest[0];
        let col = dest[1];
    
        // stack<Pair> Path;
        let Path = [];
        while (!(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col)){
            Path.push([row, col]);
            let temp_row = cellDetails[row][col].parent_i;
            let temp_col = cellDetails[row][col].parent_j;
            row = temp_row;
            col = temp_col;
            console.log(Path)
        }
    
        Path.push([row, col]);
        returnpath = Path
        console.log(returnpath + '')
/*         while (Path.length > 0) {
            let p = Path[0];
            Path.shift();
            currentPath.push(p)
        } */
        
        return;
    }
    
    // A Function to find the shortest path between
    // a given source cell to a destination cell according
    // to A* Search Algorithm
    function aStarSearch(grid, src, dest)
    {
        // If the source is out of range
        if (isValid(src[0], src[1]) == false) {
            console.log("Source is invalid\n");
            return;
        }
    
        // If the destination is out of range
        if (isValid(dest[0], dest[1]) == false) {
            console.log("Destination is invalid\n");
            return;
        }
    
        // Either the source or the destination is blocked
/*         if (isUnBlocked(grid, src[0], src[1]) == false
            || isUnBlocked(grid, dest[0], dest[1])
                == false) {
            console.log("Source or the destination is blocked\n");
            return;
        } */
        // Create a closed list and initialise it to false which
        // means that no cell has been included yet This closed
        // list is implemented as a boolean 2D array
        let closedList = new Array(ROW);
        console.log(closedList)
        for(let i = 0; i < ROW; i++){
            closedList[i] = new Array(COL).fill(false);
        }
    
        // Declare a 2D array of structure to hold the details
        // of that cell
        let cellDetails = new Array(ROW);
        for(let i = 0; i < ROW; i++){
            cellDetails[i] = new Array(COL);
        }
    
        let i, j;
    
        for (i = 0; i < ROW; i++) {
            for (j = 0; j < COL; j++) {
                cellDetails[i][j] = new cell();
                cellDetails[i][j].f = 2147483647;
                cellDetails[i][j].g = 2147483647;
                cellDetails[i][j].h = 2147483647;
                cellDetails[i][j].parent_i = -1;
                cellDetails[i][j].parent_j = -1;
            }
        }
    
        // Initialising the parameters of the starting node
        i = src[0], j = src[1];
        cellDetails[i][j].f = 0;
        cellDetails[i][j].g = 0;
        cellDetails[i][j].h = 0;
        cellDetails[i][j].parent_i = i;
        cellDetails[i][j].parent_j = j;
    
        /*
        Create an open list having information as-
        <f, <i, j>>
        where f = g + h,
        and i, j are the row and column index of that cell
        Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
        This open list is implemented as a set of pair of
        pair.*/
        let openList = new Map();
    
        // Put the starting cell on the open list and set its
        // 'f' as 0
        openList.set(0, [i, j]);
    
        // We set this boolean value as false as initially
        // the destination is not reached.
        let foundDest = false;
        console.log(openList)
        while (openList.size > 0) {
            let p = openList.entries().next().value
    
            // Remove this vertex from the open list
            openList.delete(p[0]);
    
            // Add this vertex to the closed list
            i = p[1][0];
            j = p[1][1];
            closedList[i][j] = true;
    
            /*
            Generating all the 8 successor of this cell
    
                N.W N N.E
                \ | /
                    \ | /
                W----Cell----E
                    / | \
                    / | \
                S.W S S.E
    
            Cell-->Popped Cell (i, j)
            N --> North	 (i-1, j)
            S --> South	 (i+1, j)
            E --> East	 (i, j+1)
            W --> West		 (i, j-1)
            N.E--> North-East (i-1, j+1)
            N.W--> North-West (i-1, j-1)
            S.E--> South-East (i+1, j+1)
            S.W--> South-West (i+1, j-1)*/
    
            // To store the 'g', 'h' and 'f' of the 8 successors
            let gNew, hNew, fNew;
    
            //----------- 1st Successor (North) ------------
    
            // Only process this cell if this is a valid one
            if (isValid(i - 1, j) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i - 1, j, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i - 1][j].parent_i = i;
                    cellDetails[i - 1][j].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i - 1][j] == false
                        && isUnBlocked(grid, i - 1, j)
                                == true) {
                    gNew = cellDetails[i][j].g + 1;
                    hNew = calculateHValue(i - 1, j, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i - 1][j].f == 2147483647
                        || cellDetails[i - 1][j].f > fNew) {
                        openList.set(fNew, [i - 1, j]);
    
                        // Update the details of this cell
                        cellDetails[i - 1][j].f = fNew;
                        cellDetails[i - 1][j].g = gNew;
                        cellDetails[i - 1][j].h = hNew;
                        cellDetails[i - 1][j].parent_i = i;
                        cellDetails[i - 1][j].parent_j = j;
                    }
                }
            }
    
            //----------- 2nd Successor (South) ------------
    
            // Only process this cell if this is a valid one
            if (isValid(i + 1, j) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i + 1, j, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i + 1][j].parent_i = i;
                    cellDetails[i + 1][j].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i + 1][j] == false
                        && isUnBlocked(grid, i + 1, j)
                                == true) {
                    gNew = cellDetails[i][j].g + 1;
                    hNew = calculateHValue(i + 1, j, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i + 1][j].f == 2147483647
                        || cellDetails[i + 1][j].f > fNew) {
                        openList.set(fNew, [i + 1, j]);
                        // Update the details of this cell
                        cellDetails[i + 1][j].f = fNew;
                        cellDetails[i + 1][j].g = gNew;
                        cellDetails[i + 1][j].h = hNew;
                        cellDetails[i + 1][j].parent_i = i;
                        cellDetails[i + 1][j].parent_j = j;
                    }
                }
            }
    
            //----------- 3rd Successor (East) ------------
    
            // Only process this cell if this is a valid one
            if (isValid(i, j + 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i, j + 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i][j + 1].parent_i = i;
                    cellDetails[i][j + 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i][j + 1] == false
                        && isUnBlocked(grid, i, j + 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1;
                    hNew = calculateHValue(i, j + 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i][j + 1].f == 2147483647
                        || cellDetails[i][j + 1].f > fNew) {
                        openList.set(fNew, [i, j + 1]);
    
                        // Update the details of this cell
                        cellDetails[i][j + 1].f = fNew;
                        cellDetails[i][j + 1].g = gNew;
                        cellDetails[i][j + 1].h = hNew;
                        cellDetails[i][j + 1].parent_i = i;
                        cellDetails[i][j + 1].parent_j = j;
                    }
                }
            }
    
            //----------- 4th Successor (West) ------------
    
            // Only process this cell if this is a valid one
            if (isValid(i, j - 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i, j - 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i][j - 1].parent_i = i;
                    cellDetails[i][j - 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i][j - 1] == false
                        && isUnBlocked(grid, i, j - 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1;
                    hNew = calculateHValue(i, j - 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i][j - 1].f == 2147483647
                        || cellDetails[i][j - 1].f > fNew) {
                        openList.set(fNew, [i, j - 1]);
    
                        // Update the details of this cell
                        cellDetails[i][j - 1].f = fNew;
                        cellDetails[i][j - 1].g = gNew;
                        cellDetails[i][j - 1].h = hNew;
                        cellDetails[i][j - 1].parent_i = i;
                        cellDetails[i][j - 1].parent_j = j;
                    }
                }
            }
    
            //----------- 5th Successor (North-East)
            //------------
    
            // Only process this cell if this is a valid one
            if (isValid(i - 1, j + 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i - 1, j + 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i - 1][j + 1].parent_i = i;
                    cellDetails[i - 1][j + 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i - 1][j + 1] == false
                        && isUnBlocked(grid, i - 1, j + 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1.414;
                    hNew = calculateHValue(i - 1, j + 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i - 1][j + 1].f == 2147483647
                        || cellDetails[i - 1][j + 1].f > fNew) {
                        openList.set(fNew, [i - 1, j + 1]);
    
                        // Update the details of this cell
                        cellDetails[i - 1][j + 1].f = fNew;
                        cellDetails[i - 1][j + 1].g = gNew;
                        cellDetails[i - 1][j + 1].h = hNew;
                        cellDetails[i - 1][j + 1].parent_i = i;
                        cellDetails[i - 1][j + 1].parent_j = j;
                    }
                }
            }
    
            //----------- 6th Successor (North-West)
            //------------
    
            // Only process this cell if this is a valid one
            if (isValid(i - 1, j - 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i - 1, j - 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i - 1][j - 1].parent_i = i;
                    cellDetails[i - 1][j - 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i - 1][j - 1] == false
                        && isUnBlocked(grid, i - 1, j - 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1.414;
                    hNew = calculateHValue(i - 1, j - 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i - 1][j - 1].f == 2147483647
                        || cellDetails[i - 1][j - 1].f > fNew) {
                        openList.set(fNew, [i - 1, j - 1]);
                        // Update the details of this cell
                        cellDetails[i - 1][j - 1].f = fNew;
                        cellDetails[i - 1][j - 1].g = gNew;
                        cellDetails[i - 1][j - 1].h = hNew;
                        cellDetails[i - 1][j - 1].parent_i = i;
                        cellDetails[i - 1][j - 1].parent_j = j;
                    }
                }
            }
    
            //----------- 7th Successor (South-East)
            //------------
    
            // Only process this cell if this is a valid one
            if (isValid(i + 1, j + 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i + 1, j + 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i + 1][j + 1].parent_i = i;
                    cellDetails[i + 1][j + 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i + 1][j + 1] == false
                        && isUnBlocked(grid, i + 1, j + 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1.414;
                    hNew = calculateHValue(i + 1, j + 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i + 1][j + 1].f == 2147483647
                        || cellDetails[i + 1][j + 1].f > fNew) {
                        openList.set(fNew, [i + 1, j + 1]);
    
                        // Update the details of this cell
                        cellDetails[i + 1][j + 1].f = fNew;
                        cellDetails[i + 1][j + 1].g = gNew;
                        cellDetails[i + 1][j + 1].h = hNew;
                        cellDetails[i + 1][j + 1].parent_i = i;
                        cellDetails[i + 1][j + 1].parent_j = j;
                    }
                }
            }
    
            //----------- 8th Successor (South-West)
            //------------
    
            // Only process this cell if this is a valid one
            if (isValid(i + 1, j - 1) == true) {
                // If the destination cell is the same as the
                // current successor
                if (isDestination(i + 1, j - 1, dest, grid) == true) {
                    // Set the Parent of the destination cell
                    cellDetails[i + 1][j - 1].parent_i = i;
                    cellDetails[i + 1][j - 1].parent_j = j;
                    console.log("The destination cell is found\n");
                    tracePath(cellDetails, dest);
                    foundDest = true;
                    return;
                }
    
                // If the successor is already on the closed
                // list or if it is blocked, then ignore it.
                // Else do the following
                else if (closedList[i + 1][j - 1] == false
                        && isUnBlocked(grid, i + 1, j - 1)
                                == true) {
                    gNew = cellDetails[i][j].g + 1.414;
                    hNew = calculateHValue(i + 1, j - 1, dest);
                    fNew = gNew + hNew;
    
                    // If it isn’t on the open list, add it to
                    // the open list. Make the current square
                    // the parent of this square. Record the
                    // f, g, and h costs of the square cell
                    //			 OR
                    // If it is on the open list already, check
                    // to see if this path to that square is
                    // better, using 'f' cost as the measure.
                    if (cellDetails[i + 1][j - 1].f == 2147483647
                        || cellDetails[i + 1][j - 1].f > fNew) {
                        openList.set(fNew, [i + 1, j - 1]);
    
                        // Update the details of this cell
                        cellDetails[i + 1][j - 1].f = fNew;
                        cellDetails[i + 1][j - 1].g = gNew;
                        cellDetails[i + 1][j - 1].h = hNew;
                        cellDetails[i + 1][j - 1].parent_i = i;
                        cellDetails[i + 1][j - 1].parent_j = j;
                    }
                }
            }
        }
    
        // When the destination cell is not found and the open
        // list is empty, then we conclude that we failed to
        // reach the destination cell. This may happen when the
        // there is no way to destination cell (due to
        // blockages)
        if (foundDest == false)
            console.log("Failed to find the Destination Cell\n");
    
        return;
    }
    aStarSearch(grid,src,dest)
    return currentPath
}

DOMselectors.randomizeWorld.addEventListener('click', function(){
    console.log('Generating world... \n')
    start = false
    end = false
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