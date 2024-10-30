import dotenv from "dotenv";
dotenv.config({path:".env"});
import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import { fileURLToPath, pathToFileURL } from 'url'; 
import { dirname } from 'path'; 
import cors from "cors";

//hi
//defines the __filename and __dirname variables
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

//creates an express app
const app = express();
app.use(express.json());
app.use(cors());
//use body parser to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

console.log("loading routes");
//loads all the routes from the routes folder
const routesPath = path.join(__dirname, "./src/Routes");
//reads all the files in the routes folder
Promise.all(
    fs.readdirSync(routesPath).map(async (file) => {
        try {
            //gets the full path of the route file
            const routeFile = path.join(routesPath, file);
            const routefilename = path.parse(routeFile).name;
            //imports the route file
            const routeUrl = routefilename === "index" ? "" : routefilename;
            const route = await import(pathToFileURL(routeFile).href); 
            //adds the route to the express app
            app.use(`/${routeUrl}`, route.default);
            console.log(`Route ${routeUrl} loaded`);
        } catch (error) {
            //logs an error if the route file could not be loaded
            console.error(`Error trying to load routes file ${file}: ${error.message}`);
        }
    })
).then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Error loading routes: ${error.message}`);
});