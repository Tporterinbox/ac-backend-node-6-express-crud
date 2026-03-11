// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
 // importing our Node modules
 // express → Helps create a server and API routes easily.
// fs/promises → Allows reading and writing files using async/await.
import express from "express" //Express framework used to build web servers and APIs
import fs from "fs/promises" //File system module with promise support (used to read files asynchronously)

// Creating an instance of the express module so that we can use all the methods that come with it
// This creates your Express application.
// app is now your server object where you define routes like app.get().
const app = express()

// Tell express which port to listen to to receive requests
// Defines the port number your server will run on.
// You access it in the browser at:http://localhost:3000
const port = 3000;

// This server will be receiving JSON and responding in JSON
// This middleware tells express "If the client sends JSON in the request body, 
// and automatically convert it into a JavaScript object."
// Without this line, Express cannot read JSON request bodies.
app.use(express.json())

// -----This Starts the server.-------
// Makes it listen for incoming requests. 
// and Logs a message to confirm the server is running.
// The Output in terminal: My server is listening on port: 3000
app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`)
})


// ---------------------------------
// Helper Functions-
// ---------------------------------
// Helper functions separate logic from routes so the code is cleaner.
// All functions read data from recipes-data.json.
// Reads the file-Converts JSON → JavaScript-Returns all recipes


// 1. getAllRecipes()
async function getAllRecipes() {
  // read the data from recipes-data.json
  const data = await fs.readFile("recipes-data.json", "utf8");
  // convert JSON text into JavaScript object
  const parsedRecipes = JSON.parse(data);
  // return all recipes
  return parsedRecipes;
}

// ****************************************
// 2. getOneRecipe(index)

// This Helper Function Returns one recipe based on its position in the array.
// This function gets one specific recipe from a JSON file.
// The recipe returned depends on the index (position) in the recipes array.
// The function is asynchronous because it reads a file.
//  It takes time to read a file so Node.js performs it without blocking the server.
// This allows the server to handle other requests while waiting for the file.
async function getOneRecipe(index) {

  // await fs.readFile()-- The helper function should only return names.
  // The helper function reads a file using fs.readFile()
  // Reads the JSON File- reads the contents of the file: recipes-data.json
  // await tells JavaScript to --Pause this function until the file finishes loading.
  // Without await, the function might try to use the data before it is ready.
  // utf8 is used to make sure that Files are stored as binary data.
  // utf8 tells node to - Return the file as readable text.
  // utf8 provides code that is still an string, and not yet a JavaScript Object
  const data = await fs.readFile("recipes-data.json", "utf8");
  
  // Const parcedRecipes convert JSON text into JavaScript object
  //  Now JavaScript can work with the data.
  const parsedRecipes = JSON.parse(data);
  
  // returns on recipe and uses index to access the specific recipe item
  return parsedRecipes[index];
}

// ***-->If the index does not exist, the result will show as undefined
//  can create an if statement that returns recipe not found

// ********************************************

// 3. getAllRecipeNames()
// This function returns only recipe names, but currently it returns all recipe objects.
async function getAllRecipeNames() {
    // read the data from recioes-data.json
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes;
  }



// 4. getRecipesCount()
// This Helper Function returns the number of recipes, but it currently returns the whole list.
async function getRecipesCount(){
    // read the data from recioes-data.json
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes;
  }


// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
    const recipes = await getAllRecipes();
    // res.send() sends text data

    // res.json() sends JSON data
    res.json(recipes);
  });


  // ********************************************************
  // 2. GET /get-one-recipe/:index
  // app.get-- creates a route and tells express to run this function when someone send a get request
  //  As seen below ---app.get(route goes here, function goes here)
  //  Route- is the URL pateh and Function- is the code that runs when somene visites the route
  //  for /get-one-recipe/:index--The :index part is called a dynamic route parameter. 
  // The dynamic root can change depending on the request 
  // for example   /get-one-recipe/1  (thenumber at the end becomes the index value , and can change)
  //  This function runs whenever the route is called.
  // req -  is the request object and  Contains information about the incoming request.
  // res- is the response object used to send data back to the client.
  app.get("/get-one-recipe/:index", async (req, res) => {
    
  // get the value of the dynamic parameter
    // const index = req.params.index ---- is // dynamic parameter from URL
    // When the client sends a get request, Express automatically stores dynamic parameters in req.params
    // stores the value 
    // req.params.index is a string, not a number 
    // and JavaScript automatically converts it when accessing arrays.
    const index = req.params.index;
   
    // const recipe calls the helper function  created above 
    // to recap, the helper function above Reads the JSON file, 
    // then converts the JSON into a JavaScript object and returns one recipe using index
    // so we use get one recipe to call that fuction into action
    const recipe = await getOneRecipe(index);
    
    // send the recipe as JSON in the response
    // This sends the recipe back to the client as JSON.
    // res.json() automatically Converts JavaScript objects to JSON,
    //  then Sets the correct response headers 
    // and Sends the response to the client
    res.json(recipe);
  });

  // ************************************************

// 3. GET /get-all-recipe-names
// This helper function  returns all recipe  names.
app.get("/get-all-recipe-names/:index", async (req, res) => {
    // get the value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const recipeNames = await getAllRecipeNames(index);
    // send the recipe as JSON in the response
    res.json(recipeNames);
  });


// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
    // get the value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const recipeCount = await getRecipesCount(index);
    // send the recipe as JSON in the response
    res.json(recipeCount);
  });

// ______________________________________

  // ----The API Flow ----

  // Client request--> API Endpoint (app.get) --->Helper Function--> Reads recipes-data.json
    //  Then -->return Data ---> res.json()sends response


  //  Express server -handles HTTP requests
  // --> app.get() , app.post(),  app.listen()
 
  // await fs.readFile()-- The helper function should only return names.

  //  API Routes performa specific function
  // get-all-recipes, get-one-recipe, get-recipes-count