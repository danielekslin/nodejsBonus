// import the module express

const { json } = require("express");
const express = require("express");
const fs = require('fs');


//אפליקציה שמוסיפה מתכונים

// express() function - Creates an Express application.
const app = express();
const PORT = 3000;
//creating ablity to use public directory
app.use(express.static("public"));


// like toString
app.use(express.json())
app.use(express.urlencoded({extended:true}))

if(!fs.existsSync('recipe.json')){
    fs.writeFileSync('recipe.json','[]')
}


// sending the array of the recipes to the client
app.get('/all', (req,res) =>{
    let recipeArr = fs.readFileSync('recipe.json').toString()
    res.send(recipeArr)
    res.status(200)
})



//adding new recipe
app.post('/add',(req,res)=>{
    // get all the arr from the file & convert to json
    let recipeArr = JSON.parse(fs.readFileSync('recipe.json').toString())
    // adding new recipe from req.body to the array
    recipeArr.push(req.body)
    // wrting new array back to the file
    fs.writeFileSync('recipe.json',JSON.stringify(recipeArr))
    
    res.send('new recipe was added succsesfully')
    res.status(201)

})


//update recipe's difficulty
app.put('/update/:food', (req,res)=>{
    //get all the array from the file & convert to json arr
    let recipeArr = JSON.parse(fs.readFileSync('recipe.json').toString())

    // find the first elemental that return true for condition
    let myRecipe = recipeArr.find(r=>r.foodName ===req.params.food)

    if(myRecipe !== undefined){
        myRecipe.difficulty = req.body.newDifficulty
        //write new arr back to the file
        fs.writeFileSync('recipe.json',JSON.stringify(recipeArr))
        res.send("recipe's difficulty was updated succesfully")
    }
    res.send("no recipe was updated")
})



//delete recipe by id
app.delete('/delete/:id', (req,res)=>{
    // agien get all arr from file and convert to json arr..
    let recipeArr = JSON.parse(fs.readFileSync('recipe.json').toString())
    
    let len = recipeArr.length
     // doing prefix(+) to params since its originlly a string
    recipeArr = recipeArr.filter(r => r.id != +req.params.id)

    // if recipe was deleted:
    if(recipeArr.length < len){
        fs.writeFileSync('recipe.json',JSON.stringify(recipeArr))
        res.send("recipe was deleted succesfully")
    }
    res.send("no recipe was deleted")
})



// listen(port, callback function) -> activate the app
app.listen(PORT, () => console.log(`Listening in port ${PORT}...`));
