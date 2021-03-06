// our data


const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=958aa9d1b7454537cda44ce567eb4008&language=en-US&page=1'
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

function carousell(data){
  // for (let i = 0; i < 5; i ++) { 
  //   let carousellItem = document.getElementsByClassName("carousell");
  //   carousellItem.scr= "${IMG_URL+data[i].poster_path}"
  // }
  //   <span class = "carousell" style="--i:1;">
  // <img src="https://i.postimg.cc/BQcRL38F/pexels-photo-761963.jpg" alt="not found">
  // </span>
  for(let i = 0; i < 8; i++){
   console.log( data[i].poster_path);
  let cards = document.createElement("span");
  cards.classList.add('carousell')
  cards.style=`--i:${i};` // =. this becomes i aka index
  cards.innerHTML = `<img src = "${IMG_URL+data[i].poster_path}" alt ="${data[i].title}">`

  document.querySelector('.scope').appendChild(cards);
  }
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



function whishList() {
    var element = document.getElementById("list");
    element.classList.toggle("list");
    
 
}

function change() 
{
  var elem = document.getElementById("whish-btn")
    if (elem.innerHTML=="Wish List +") elem.innerHTML = "Close -";
    else elem.innerHTML = "Wish List +";
}

const signs = document.querySelectorAll("x-sign");
const randomIn = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const mixupInterval = (el) => {
  const ms = randomIn(2000, 4000);
  el.style.setProperty("--interval", `${ms}ms`);
};

signs.forEach((el) => {
  mixupInterval(el);
  el.addEventListener("webkitAnimationIteration", () => {
    mixupInterval(el);
  });
});


function getData (){

    fetch(API_URL)
    .then(response =>  response.json())
    .then(data => {
      renderMovies(data.results);
      // carousell(data.results);
      enableWishListBtn();
      console.log(data.results);
      carousell(data.results)
      return data.results
      
    })

}

getData();


