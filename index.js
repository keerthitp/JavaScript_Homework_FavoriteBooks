var show = false;
var bookLimit = 5;
var bookList = [
                   
            ];


/* bookList = [
                {
                    bookTitle: "Da Vinci Code",
                    bookImageUrl: "images/DaVinciCode.jpeg",
                    bookDesc: `"
                    While in Paris on business, Harvard symbologist Robert Langdon receives an urgent late-night phone call: the elderly curator of the Louvre has been murdered inside the museum. Near the body, police have found a baffling cipher. While working to solve the enigmatic riddle, Langdon is stunned to discover it leads to a trail of clues hidden in the works of Da Vinci, clues visible for all to see, yet ingeniously disguised by the painter.
                    "`
                },
                {
                    bookTitle: "Inferno",
                    bookImageUrl: "images/Inferno.jpeg",
                    bookDesc: `"
                    Harvard professor of symbology Robert Langdon awakens in an Italian hospital, disoriented and with no recollection of the past thirty-six hours, including the origin of the macabre object hidden in his belongings. With a relentless female assassin trailing them through Florence, he and his resourceful doctor, Sienna Brooks, are forced to flee. Embarking on a harrowing journey, they must unravel a series of codes, which are the work of a brilliant scientist whose obsession with the end of the world is matched only by his passion for one of the most influential masterpieces ever written, Dante Alighieri's The Inferno. 
                    "`
                },
                {
                    bookTitle: "Angels & Demons",
                    bookImageUrl: "images/AngelsAndDemons.jpeg",
                    bookDesc: `"
                    Harvard professor of symbology Robert Langdon awakens in an Italian hospital, disoriented and with no recollection of the past thirty-six hours, including the origin of the macabre object hidden in his belongings. With a relentless female assassin trailing them through Florence, he and his resourceful doctor, Sienna Brooks, are forced to flee. Embarking on a harrowing journey, they must unravel a series of codes, which are the work of a brilliant scientist whose obsession with the end of the world is matched only by his passion for one of the most influential masterpieces ever written, Dante Alighieri's The Inferno. 
                    "`
                },
                {
                    bookTitle: "Deception",
                    bookImageUrl: "images/Deception.jpeg",
                    bookDesc: `"
                    Harvard professor of symbology Robert Langdon awakens in an Italian hospital, disoriented and with no recollection of the past thirty-six hours, including the origin of the macabre object hidden in his belongings. With a relentless female assassin trailing them through Florence, he and his resourceful doctor, Sienna Brooks, are forced to flee. Embarking on a harrowing journey, they must unravel a series of codes, which are the work of a brilliant scientist whose obsession with the end of the world is matched only by his passion for one of the most influential masterpieces ever written, Dante Alighieri's The Inferno. 
                    "`
                },
                {
                    bookTitle: "Lost Symbol",
                    bookImageUrl: "images/LostSymbol.jpeg",
                    bookDesc: `"
                    Harvard professor of symbology Robert Langdon awakens in an Italian hospital, disoriented and with no recollection of the past thirty-six hours, including the origin of the macabre object hidden in his belongings. With a relentless female assassin trailing them through Florence, he and his resourceful doctor, Sienna Brooks, are forced to flee. Embarking on a harrowing journey, they must unravel a series of codes, which are the work of a brilliant scientist whose obsession with the end of the world is matched only by his passion for one of the most influential masterpieces ever written, Dante Alighieri's The Inferno. 
                    "`
                }


]    
  */           

  var bookTitle, imageUrl, bookDesc;
  bookDesc=bookTitle=imageUrl='';

class FormComponent{

    constructor(){
    this.template = `
                    <div id="form">
                        Book Title : <input type="text" id="BookTitle"> <br>
                        ImageUrl   : <input type="text" id="ImageUrl"><br>
                        Description: <input type="text" id="BookDesc"><br>
                        <h1 id="ErrorMsg"></h1>
                        <button  id="addBook">Submit</button>
                        
                    </form>
                    
                `
    }
                
                
}
var i =0;

class BookService{

    getAllBooks(){
        return bookList;

    }

    getBookByIndex(index){
        return bookList[index];
    }

   addBook(){

    if (bookList.length ==5){
        document.getElementById("ErrorMsg").innerHTML="Only 5 books can be added, limit reached";
    
    }
    else

     if(bookTitle.length >0 && imageUrl.length >0 && bookDesc.length >0 ){
       var book = {
        bookTitle: bookTitle,
        bookImageUrl: imageUrl,
        bookDesc: bookDesc
       }
        bookList.push(book);
        console.log("Printing Book list from add book service");

        console.log(bookList);
     }
    }   

}
class BookComponent{

    constructor (title, imageLocation, description){
        /* 
        this.bookTitle = bookList.bookTitle
        this.bookImageUrl = bookList.bookImageUrl;
        this.bookDesc = bookList.bookDesc; */

        this.bookTitle = title;
        this.bookImageUrl = imageLocation;
        this.bookDesc = description; 

        this.template = 
        `
        <div class="card" style="width: 18rem;">
        <img src="${this.bookImageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${this.bookTitle}</h5>
        
          <button id ="showHideButton${i++}" class="btn btn-primary btn-sm">Show Description</button>
        </div>
      </div>
        `
    }

}    

class BookListComponent{

    constructor(bookService){
        
        this.bookList = bookService.getAllBooks();
        this.template = 
        `
        <div id = "header">
        <h1>My Favorite Books</h1>
        </div>
        <div class="flex-container">
        
            ${this.bookList.map(e=>new BookComponent(e.bookTitle, e.bookImageUrl,e.bookDesc).template).join('')}
    
        
      </div>
        
        `
    }

}

class Container{
   

    template =`
            ${new BookListComponent(bookService).template}

    `
   
}


bookService = new BookService();
  
document.getElementById("form").innerHTML = new FormComponent().template;

document.getElementById("desc").innerHTML = "";

container = new Container().template;

document.getElementById("root").innerHTML = container;



document.getElementById("root").addEventListener("click", function(e){
    console.log("Inside Listener");
    console.log("click object id: "+ e.target.id);
    
    if(e.target && e.target.id.includes("showHideButton")) {
        var buttonIndex = e.target.id.charAt(e.target.id.length-1);
        console.log("ButtonIndex:"+ buttonIndex);
       
            if(show == false){

                console.log("Inside False");
                document.getElementById("showHideButton"+buttonIndex).innerText = "Hide Description";
                document.getElementById("showHideButton"+buttonIndex).style.backgroundColor = "red";
                console.log(bookList[buttonIndex]);
                document.getElementById("desc").innerHTML = bookService.getBookByIndex(buttonIndex).bookDesc; /* bookList[buttonIndex].bookDesc; */
                show = true;

            }
            else {
                console.log("Inside True");
                document.getElementById("showHideButton"+buttonIndex).innerText = "Show Description";
                document.getElementById("showHideButton"+buttonIndex).style.backgroundColor = "blue";
                document.getElementById("desc").innerHTML = "";
                show = false;
            }
        

    }

})

document.getElementById("form").addEventListener("click", function(e){

    if(e.target && e.target.id == "addBook"){
        bookDesc = document.getElementById("BookDesc").value;
        bookTitle = document.getElementById("BookTitle").value;
        imageUrl = /* "images/AngelsAndDemons.jpeg"; */document.getElementById("ImageUrl").value;
        console.log("In addBook: "+ bookDesc+"->"+ bookTitle);

        bookService.addBook();
        console.log("Inside Addbook");
        console.log("Printing booklist");
        console.log(bookList[bookList.length-1].bookTitle);
        show = false;
        i = 0;
         document.getElementById("root").innerHTML = new Container().template;
    }


})



