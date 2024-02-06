//=============================================================================
// maze.cpp
//
// C++ implementation of a recursive maze-generating program.
//
// History:
// 2006.03.30 / Abe Pralle - Created
// 2010.04.02 / Abe Pralle - Converted to C++
//=============================================================================
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;
//----CONSTANTS-------------------------------------------------------


#define NORTH 0
#define EAST 1
#define SOUTH 2
#define WEST 3
//----GLOBAL VARIABLES------------------------------------------------
int GRID_WIDTH=0;
int GRID_HEIGHT=0;
int gridSize = 0;

std::vector<int> grid(0);

//----FUNCTION PROTOTYPES---------------------------------------------
void ResetGrid();
int XYToIndex( int x, int y );
int IsInBounds( int x, int y );
void Visit( int x, int y );
void PrintGrid();
//----FUNCTIONS-------------------------------------------------------
void ResetGrid(){
    // Fills the grid with walls ('#' characters).
    for (int i=0; i<GRID_WIDTH*GRID_HEIGHT; ++i){
    grid[i] = '1';
    }
}
int XYToIndex( int x, int y ){
    // Converts the two-dimensional index pair (x,y) into a
    // single-dimensional index. The result is y * ROW_WIDTH + x.
    return y * GRID_WIDTH + x;
}
int IsInBounds( int x, int y ){
    // Returns "true" if x and y are both in-bounds.
    if (x < 0 || x >= GRID_WIDTH){
        return false;
    }
    if (y < 0 || y >= GRID_HEIGHT){
        return false;
    } else{
        return true;
    }
    //return true;
}
// This is the recursive function we will code in the next project
void Visit( int x, int y ){
    // Starting at the given index, recursively visits every direction in a
    // randomized order.
    // Set my current location to be an empty passage.
    grid[ XYToIndex(x,y) ] = '0';
    // Create an local array containing the 4 directions and shuffle their order.
    int dirs[4];
    dirs[0] = NORTH;
    dirs[1] = EAST;
    dirs[2] = SOUTH;
    dirs[3] = WEST;
    for (int i=0; i<4; ++i){
        int r = rand() & 3;
        int temp = dirs[r];
        dirs[r] = dirs[i];
        dirs[i] = temp;
    }
    // Loop through every direction and attempt to Visit that direction.
    for (int i=0; i<4; ++i){
    // dx,dy are offsets from current location. Set them based
    // on the next direction I wish to try.
        int dx=0, dy=0;
        switch (dirs[i]){
        case NORTH: dy = -1; break;
        case SOUTH: dy = 1; break;
        case EAST: dx = 1; break;
        case WEST: dx = -1; break;
        }
        // Find the (x,y) coordinates of the grid cell 2 spots
        // away in the given direction.
        int x2 = x + (dx<<1);
        int y2 = y + (dy<<1);
        if (IsInBounds(x2,y2)){
            if (grid[ XYToIndex(x2,y2) ] == '1'){
                // (x2,y2) has not been visited yet... knock down the
                // wall between my current position and that position
                grid[ XYToIndex(x2-dx,y2-dy) ] = '0';
                // Recursively Visit (x2,y2)
                Visit(x2,y2);
            }
        }
    }
}
void PrintGrid(){
    // Displays the finished maze to the screen.
/*     for( int y = 0; y < GRID_HEIGHT; ++y){
        for(int x = 0;x<GRID_WIDTH;++x){
            switch(grid[x][y]){
                case 49:
                    grid[x][y]
            }
        }
    } */
  for (int x : grid) {
    switch(x){
        case 49:
            x = 1;
            break;
        case 48:
            x = 0;
            break;
    }
    std::cout << x;
  }

/*    std::cout << std::endl;
      for (int y=0; y< GRID_HEIGHT; ++y){
        for (int x=0; x<GRID_WIDTH; ++x){
            switch(grid[y][x]){
                case 49:
                    grid[y][x] = 
            }
            cout << grid[XYToIndex(x,y)];
        }
        cout << endl;
    } */
}

int main(int argc, char** argv) {

    GRID_WIDTH = stoi(argv[1]);
    GRID_HEIGHT = stoi(argv[2]);
    gridSize = GRID_WIDTH * GRID_HEIGHT;
    grid.resize(gridSize);

    // Starting point and top-level control.
    srand( time(0) ); //give random number value based on time on the pc (makes sure every maze is unique)
    ResetGrid(); //clear grid and set it for all 1s
    Visit(1,1); //start maze at 1,1
    PrintGrid(); //iterate through the array to draw it
    return 0;

}