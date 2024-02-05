function generateMaze(){
    
    const north = 0
    const south = 2
    const east = 1
    const west = 3
    function resetGrid(){ //resets the world by filling it with 1s
        for( let i=0; i<worldWidth*worldHeight;i++){
            world[i] = '0'
        }
    }
    function XYToIndex(x,y){ //converts the x and y to a single index value
        return y*worldWidth+x
    }
    function inBounds(x,y){ // checks bounds, if x and y are in bounds returns true
        if(x < 0 || x >= worldWidth){
            return false
        }
        if(y < 0 || y >= worldHeight){
            return false
        } else{
            return true
        }
    }
    function visit(x,y){
        world[XYToIndex(x,y)] = '1'
        const dirs = [north, east, south, west]
        for(let i=0; i<4; ++i){
            let r =  Math.random(3)
            let temp = dirs[r]
            dirs[r] = dirs[i]
            dirs[i] = temp
        }
        for(let i=0;i<4;++i){
            let dx = 0, dy = 0
            switch(dirs[i]){
                case north:
                    dy = -1
                    break
                case south:
                    dy = 1
                    break
                case east:
                    dx = 1
                    break
                case west:
                    dx = -1
                    break
            }
            let x2 = x + (dx<<1)
            let y2 = y + (dy<<1)
            if (inBounds(x2,y2)){
                if(world[XYToIndex(x2,y2)] == '0'){
                    world[XYToIndex(x2-dx, y2-dy)] = '1'
                    visit(x2,y2)
                }
            }
        }
    }
    
    resetGrid()
    visit(1,1)
    console.log("Maze: " + world)
}