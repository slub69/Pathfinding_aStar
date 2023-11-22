function DOMNode(Parent, Point){//function to define the values that each node holds (in relation to itself and its parent) this way we can do the aStar
   let worldWidth= 500
    console.log(Point)
    let newNode = { // represents the node as a set of values in an array
        Parent:Parent, //Parent node is parent of the nodes data 
        value: Point.x + (Point.y * worldWidth), //gives the node a value so that it can be evaluted for the path
        x:Point.x,//gives the point its coords
        y:Point.y,
        f:0,//distance to destination node
        //^the value that will be used to caluclate distance (the math behind this value and what it repersents will be define later)
        g:0//the distance from the starting point
    }
    return newNode
}
console.log(DOMNode(null, {x:45, y:100}))