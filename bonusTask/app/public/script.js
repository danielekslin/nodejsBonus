function get(){
  let req = new XMLHttpRequest();

  req.open('GET','http://localhost:3000/all');
   
  req.onreadystatechange = () =>{
      // if request finished loading - 
      if(req.readyState === 4 ){
             //req.readyState = the data that returns from the url
             // the result come back as string and we need to convert it to json so luanch it in array

          let arr = JSON.parse(req.response);
      
          let result = ``;
          result += `<th>ID </th>
          <th>foodName </th>
          <th>Duartion </th>
          <th>Difficulty </th>
          <th>Edit Difficulty</th>
          <th>Delete</th>
          `
          for (const recipe of arr) {
              result += `<tr>
                  <td>${recipe.id}</td>
                  <td>${recipe.foodName}</td>
                  <td>${recipe.duartion}</td>
                  <td>${recipe.difficulty}</td>
                  <td><button class= "btn btn-success" onclick ="put('${recipe.foodName}')">Edit</button></td>
                  <td><button class = "btn btn-danger" onclick ="deleteRecipe('${Number(recipe.id)}')">Delete</button></td>
                  </tr>`
          }
          document.getElementById('recip').innerHTML = result;

        }

  }
  req.send();
}

function post(){
  // getting all the values from input and add them 
  let sid = document.getElementById('sid').value;
  let sfood = document.getElementById('sfood').value;
  let sduar = document.getElementById('sduar').value;
  let sdiff = document.getElementById('sdiff').value;

  let req = new XMLHttpRequest();
  req.open('POST','http://localhost:3000/add')

  req.onreadystatechange = ()=>{
    if(req.readyState === 4){
      get();
    }
    
  }
  req.setRequestHeader('Content-type','application/json');

    req.send(JSON.stringify({"id":sid,"foodName":sfood,"duartion":sduar,"difficulty":sdiff}));
}


function put(param){
  let newDiff = prompt(`enter the new difficulty`)
 
  let req = new XMLHttpRequest();
  req.open('PUT', `http://localhost:3000/update/${param}`)
  
  req.onreadystatechange = ()=>{
    if(req.readyState === 4){
      get();
    }
    req.setRequestHeader('Content-type','application/json')
    req.send(JSON.stringify({"newDifficulty":newDiff}))
}



}

function deleteRecipe(id){

  let req = new XMLHttpRequest();
  req.open('DELETE',`http://localhost:3000/delete/${id}`)

  req.onreadystatechange = ()=>{
    if(req.readyState === 4){
      get();
    }
    res.send();
}

}