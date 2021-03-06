const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const sectionMain = document.querySelector('.main');
const button = document.querySelector('button');
let perPage = 20;
let searchString = '';
//API
const APP_ID = 'cd752456';
const APP_KEY = '5674e31331fc13520e5c996c79b2471a';


searchForm.addEventListener('submit', (e)=>{
e.preventDefault();
searchString = e.target.querySelector('input').value;
fetchAPI();
setTimeout(function(){
    button.classList.remove('dont-show');
},1000);


});
async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${perPage}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
  
    
}
function generateHTML(results){
    let generatedHTML ='';
    results.map(result => {
        generatedHTML +=
        `
        <div class="search-result__item">
        <img class="search-result__item-img" src="${result.recipe.image}" alt="">
        <div class="search-result__item-info">
            <h1 class="search-result__item-title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="search-result__item-link">Link</a>
        </div>
        <p class="search-result__item-kcal">Calories: ${result.recipe.calories.toFixed(0)}</p>
        <p class="search-result__item-kcal">Diet label: ${result.recipe.dietLabels.lenght > 0 ? result.recipe.dietLabels.lenght : 'No Data Found'}</p>
        <p class="search-result__item-kcal">Health Label: ${result.recipe.healthLabels}</p>
    </div>
    `

    })
    searchResult.innerHTML = generatedHTML;
   
}
//Pagination
button.addEventListener('click', ()=>{
    perPage += 20;
    fetchAPI();
});