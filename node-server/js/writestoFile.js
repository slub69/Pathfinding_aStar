inputWidth = document.getElementById('width')
inputHeight =  document.getElementById('height')

// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs')
 
// Data which will write in a file.
let data = inputWidth.value + '...' + inputHeight.value
 
// Write data in 'Output.txt' .
fs.writeFile('Output.txt', data, (err) => {
 
    // In case of a error throw err.
    if (err) throw err;
})
