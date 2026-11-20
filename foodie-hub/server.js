// Import required Node.js modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// Port on which the server will run
const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = http.createServer((req, res) => {

    // If the user visits "/", serve index.html
    let filePath;

    if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
    } else {
        filePath = path.join(__dirname, "public", req.url);
    }

    // Get the file extension
    const extension = path.extname(filePath);

    // Define content types
    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg"
    };

    const contentType = contentTypes[extension] || "text/plain";

    // Read the requested file
    fs.readFile(filePath, (error, content) => {

        if (error) {

            // Send 404 if file is not found
            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            res.end("<h1>404 - Page Not Found</h1>");

        } else {

            // Send the file to the browser
            res.writeHead(200, {
                "Content-Type": contentType
            });

            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`FoodieHub server running on port ${PORT}`);
});