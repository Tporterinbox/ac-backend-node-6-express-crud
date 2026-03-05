// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
 // importing our Node modules
import express from "express"
import fs from "fs/promises"

// Creating an instance of the express module so that we can use all the methods that come with it
const app = express()

// Tell express which port to listen to to receive requests
const port = 3000;

// This server will be receiving JSON and responding in JSON
app.use(express.json())

app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`)
})


// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()
async function getAllRecipes() {
  // read the data from recipes-data.json
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes;
}


// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes[index];
}



// 3. getAllRecipeNames()
async function getAllRecipeNames() {
    // read the data from recioes-data.json
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    return parsedRecipes;
  }



// 4. getRecipesCount()

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

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
    // get the value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const recipe = await getOneRecipe(index);
    // send the recipe as JSON in the response
    res.json(recipe);
  });
// 3. GET /get-all-recipe-names
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