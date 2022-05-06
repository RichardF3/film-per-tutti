// our data


const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=958aa9d1b7454537cda44ce567eb4008&language=en-US&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'





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
        <button class="Add-to-wish-list" id="" >Add to wish list</button>
      `
}


function renderMovies(data){
  
      for (let i = 0; i < data.length; i ++) {  
            
        let todoItem = document.createElement("div");  
        todoItem.classList.add("movie"); 
        todoItem.innerHTML = createCard(IMG_URL, data[i].poster_path, data[i].title, data[i].vote_average, data[i].overview);
      
      
        document.querySelector('.gallery').appendChild(todoItem);
      }
}


function myFunction() {
  var x = document.querySelector(".wishlist");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}




function getData (){

  fetch(API_URL)
  .then(response =>  response.json())
  .then(data => {
    renderMovies(data.results);
    enableWishListBtn();
    return data.results
  }).then(data => {movies = data, console.log(movies)});
}

getData();
