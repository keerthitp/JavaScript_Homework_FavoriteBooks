arr = ["audi", "nissan", "honda"]
name = '';

document.getElementById("root").innerHTML=arr;

formStr= `
Book Title : <input type="text" id="name"> <br>
<button  id="addBook">Submit</button>
`

document.getElementById("form").innerHTML = formStr;



document.getElementById("form").addEventListener("click", function(e){
        console.log("Inside listener");
    if(e.target && e.target.id == "addBook"){
        console.log("Inside listener+ addBook")
        
        name = document.getElementById("name").value;
        console.log("Value of the text entered: "+ name);

        arr.push(name);
        console.log("Arr values");
        console.log(arr);
        document.getElementById("root").innerHTML=arr;

    }

})