// our data


const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=958aa9d1b7454537cda44ce567eb4008&language=en-US&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
let movies = [];




function createCard(IMG_URL,poster_path, title, vote_average, overview) {
      return `
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">

                      <img src="${IMG_URL+poster_path}" alt="${title}">
                    </div>

                    <div class="flip-card-back">
                        <div class"info">
                            <h3>${title}</h3>
                            <span class="vote_average" >Score: ${vote_average}</span>
                        </div>
                        <div class="overview">
                            <h3>Overview</h3>
                            <br>
                            ${overview}
                            <br> 
                            
                        </div>
                        
                    </div>
                  </div>
                </div>
        <button class="Add-to-wish-list"  >Add to wish list</button>
      `
}


function renderMovies(data){
  
      for (let i = 0; i < data.length; i ++) {  
       
        let todoItem = document.createElement("div");  
        todoItem.classList.add("movie"); 
        todoItem.setAttribute("id", i); 
        todoItem.innerHTML = createCard(IMG_URL, data[i].poster_path, data[i].title, data[i].vote_average, data[i].overview);
      
      
        document.querySelector('.gallery').appendChild(todoItem);
      }
}

function enableWishListBtn() {
btn = document.querySelectorAll(".Add-to-wish-list");

btn.forEach( function(btn){ 
  
  btn.addEventListener("click", (e) => {
      btn.setAttribute("id", "added");
      
      var parent = e.target.parentNode;
			var clone = parent.cloneNode(true);
      
			document.querySelector('.wishlist').appendChild(clone);
      
      btn.id = "2";
      enableDeleteEvent();

      toggle()
  }
  );
  
})
}  

function toggle(){
  const nodeList = document.querySelectorAll("#added");
   for (let i = 0; i < nodeList.length; i++) {
  nodeList[i].innerHTML = "Remove from list";
 }
}


function enableDeleteEvent() {
  
  
  let deleteBtns = document.querySelectorAll('#added');
  
  deleteBtns.forEach( function(oneDeleteBtn){ 

      oneDeleteBtn.addEventListener("click", (e) => {
      
      
      oneDeleteBtn.parentElement.remove()
      
      
      }                              
    );
  }) 
  
}
  
// btns = document.getElementsByClassName("Add-to-wish-list");
// for (var i = 0; i < btns.length; i++) {

// btns[i].addEventListener("click", function () {
//    item = document.getElementById(i);
//    document.querySelector('.wishlist').appendChild(item);
// })}




function myFunction() {
  var x = document.querySelector(".wishlist");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}




function getData (){

  fetch(API_URL)
  .then(response =>  response.json())
  .then(data => {
    renderMovies(data.results);
   
    enableWishListBtn();
    return data.results
  })

}

getData();


