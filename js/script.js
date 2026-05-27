let data = []

const getMovies = document.querySelector(".movies__cards")
const showMore = document.querySelector(".show__more-btn")


const InputName = document.querySelector("#form-inputName")
const InputEmail = document.querySelector("#form-inputEmail")
const formBtn = document.querySelector(".sub__form-btn")
const form = document.querySelector(".contact-form")

form.addEventListener("submit", function(event){

    event.preventDefault()

    if(!InputName.value){

        InputName.classList.add("required")
        InputEmail.classList.remove("required")

    }

    else if(!InputEmail.value){

        InputName.classList.remove("required")
        InputEmail.classList.add("required")

    }

    else{

        InputName.classList.remove("required")
        InputEmail.classList.remove("required")

        console.log(`
Вы подписались!
Ваше имя: ${InputName.value}
Ваша почта: ${InputEmail.value}
        `)

    }

})

 const burger = document.querySelector(".header__menu-burger")
        const menu = document.querySelector(".header__menu-list")

        burger.addEventListener("click", function () {
            menu.classList.toggle("header__menu--active")
        })

const modal = document.querySelector(".modal")
const modalImg = document.querySelector(".modal-img")
const modalTitle = document.querySelector(".modal-title")
const modalDescription = document.querySelector(".modal-description")
const modalYear = document.querySelector(".modal-year")
const modalRating = document.querySelector(".modal-rating")
const modalClose = document.querySelector(".modal-close")

const themeToggle = document.querySelector(".theme-toggle")

themeToggle.addEventListener("click", function(){

   document.body.classList.toggle("light-theme")

   if(document.body.classList.contains("light-theme")){
      themeToggle.textContent = "☀️"
   } 
   else {
      themeToggle.textContent = "🌙"
   }

})

function drawCards(card){

    getMovies.innerHTML += `
    
    <div class="movie-card">

      <div class="movie__img">
        <img class="movie-img" src="${card.poster}" alt="${card.title}"/>
      </div>    

      <div class="movie-info">

        <h3 class="movie-title">${card.title}</h3>

        <p class="movie-year">${card.year} год</p>

        <p class="movie-category">${card.genre.join(", ")}</p>

        <div class="movie-rating">
          Оценка: ${card.rating}
        </div>

        <button class="movie-btn" onclick="openModal(${card.id})">
          Подробнее
        </button>

      </div>

    </div>

    `
}



function openModal(id){

   const card = data.movies.find(movie => movie.id === id)

   modal.classList.add("active")

   modalImg.src = card.banner
   modalTitle.textContent = card.title
   modalDescription.textContent = card.description
   modalYear.textContent = `${card.year} год`
   modalRating.textContent = `Оценка ${card.rating}`
}



modalClose.addEventListener("click", function() {
   modal.classList.remove("active")
})



modal.addEventListener("click",  function(e) {

   if(e.target === modal){
      modal.classList.remove("active")
   }

})



showMore.addEventListener("click", function(){

   showMore.style.display = "none"

   for (let i = 6; i < 12; i++) {
      drawCards(data.movies[i])
   }

})



async function getFilms() {

   try {

      let res = await fetch("https://dummyjson.com/c/31a3-f1e4-4453-95fc")

      if (!res.ok) {
         throw new Error("Ошибка! " + res.status)
      }

      data = await res.json()

      for (let i = 0; i < 6; i++) {
         drawCards(data.movies[i])
      }

   }

   catch (err) {
      console.error(err)
   }
}



getFilms()