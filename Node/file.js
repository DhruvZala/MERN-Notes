// const fs = require("fs")

// fs.writeFileSync("./test.txt", "Hello World With node");

// Common use for the File System module:

// Read files
// Create files
// Update files
// Delete files
// Rename files

// Create file
// The File System module has methods for creating new files:

// fs.appendFile()
// fs.open()
// fs.writeFile()

// The fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created:

// The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. 
// If the file does not exist, an empty file is created:

// The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, 
// a new file, containing the specified content, will be created:

// => Update Files
// The File System module has methods for updating files:

// fs.appendFile()
// fs.writeFile()
// The fs.appendFile() method appends the specified content at the end of the specified file:
// The fs.writeFile() method replaces the specified file and content

// => Delete Files
// To delete a file with the File System module,  use the fs.unlink() method.

// => Rename Files
// To rename a file with the File System module,  use the fs.rename() method.

// fs.readFile("./test.txt", "utf-8", (err, result) => {
//     if(err) {
//         console.log("Error :", err);
//     } else {
//         console.log(result)
//     }
// });