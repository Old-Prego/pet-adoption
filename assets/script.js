

// General global variables. petList gets the location of where the HTML templates will be dumped.
var petCard;
var petLocation;
var petList = document.getElementById("petList");
var breedArray = []
// On loading the results page, this loads the query parameters from the search form
// It also puts these parameters into variables, so that it is easier to query the API
var params = new URLSearchParams(document.location.search.substring(1));
var qCityState = params.get("cityState");
var qZIP = params.get("zip");
var qAnimal = params.get("animal");
var qDistance = params.get("distance");
var qDogBreed = params.get("dogBreed");
var qCatBreed = params.get("catBreed");
var qAge = params.get("Age");

// Template tag parser courtesy of Nate
// This takes template tags and parses them into HTML elements that are appendable to the current scope
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;



// This is the actual template for the HTML, with variables passed to it.
function buildPetCard(petName,petImg,petBreed,petAge,petDist,petLoc,petStatus,petDescr){

    let petCard = html `
    <div class='columns small-12 medium-4 large-3 end'>
    <div class='card-container'>
        <div id='${petName}' class="card-flex-animal card">
            <div class="card-image">
                <img src="${petImg}">
                <span id='nameofpet' class="label card-name">${petName}</span>
            </div>
            <div class="card-section">
                <h3 class="card-title">${petBreed}</h3>
                <div class="main-details">
                    <span class="age">${petAge}yo | </span>
                    <span class="status">Adoption Status: ${petStatus}</span>
                    <span class="distance">${petDist}mi away</span>
                </div>
                <p>${petDescr}</p>
                </br>
                <p class='animal-details'>${petLoc.address1}, ${petLoc.address2}</p>
                <p class='animal-details'>${petLoc.city}, ${petLoc.state} ${petLoc.zip}</p>
            </div>
        </div>
    </div>
    </div>`

    return petCard;
};


//Breed Api Fetch, grabs breeds based on Animal of choice and returns them as search parameters

function fetchBreeds(){
  var key = "j4sCZuvwpfgBJBJkcTF1Q2jWK3imT2gtsdOUiC3QwKjtLahsYP";
  var secret = "aN0ZxQr0R1rBU7ikZCowpLOuVUQDqE0Z65Ck6Glb";
  var url  = "https://api.petfinder.com/v2/types/"
  fetch('https://api.petfinder.com/v2/oauth2/token', {
  	method: 'POST',
  	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
  	headers: {
  		'Content-Type': 'application/x-www-form-urlencoded'
  	}
  }).then(function (response) {
  	return response.json();

  }).then(function (data) {
    //A second call going to be made to the Api, this one will use the token data to retrive information,
    return fetch(url + qAnimal + "/breeds", {
      headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    })
  }).then(function (response) {
  	return response.json();

  }).then(function (data) {
    for (i = 0 ; i < data.breeds.length; i++){
      breedArray[i] = data.breeds[i].name
      //direct the data to drop down
      console.log(breedArray[i])
    }
  }).catch(function (error) {
  	console.log('YOU FOOL!', error );

  });
}


// Space for the PetFinder API fetch
// On loading the results page, this loads the query parameters from the search form
// It also puts these parameters into variables, so that it is easier to query the API
var params = new URLSearchParams(document.location.search.substring(1));
var qCityState = params.get("cityState");
var qZIP = params.get("zip");
var qAnimal = params.get("animal");
var qDistance = params.get("distance");
var qDogBreed = params.get("dogBreed");
var qCatBreed = params.get("catBreed");
var qAge = params.get("age");

//Get inut from forum and orgnizes it inorder to add it to the url as parametes...
function queryParmeters(qCityState,qZIP,qAnimal,qDistance,qDogBreed,qCatBreed,qAge){

    query = `?type=${qAnimal}`
    if (qAnimal == "dog"){
      if (qDogBreed != "any"){
        query = query + `&breed=${qDogBreed}`;
      }
    }else if (qAnimal == "cat"){
      if (qCatBreed != "any"){
        query = query + `&breed=${qCatBreed}`;
      }
    }
    if (qDistance != null){
      query = query + `&distance=${qDistance}`;
    }
    if (qAge != "any"){
      query = query + `&age=${qAge}`;
    }
    if (qZIP != null){
      query = query + `&location=${qZIP}`;
    }else if (qCityState != null){
      query = query + `&location=${qCityState}`;
    }

    return query
  }

let animalQParam = queryParmeters(qCityState,qZIP,qAnimal,qDistance,qDogBreed,qCatBreed,qAge);

function fetchAnimals(parameters){

  var key = "j4sCZuvwpfgBJBJkcTF1Q2jWK3imT2gtsdOUiC3QwKjtLahsYP";
  var secret = "aN0ZxQr0R1rBU7ikZCowpLOuVUQDqE0Z65Ck6Glb";
  var url = "https://api.petfinder.com/v2/animals"
  

  //uses the fetch api to get a current access token from the petfinder Api
  fetch('https://api.petfinder.com/v2/oauth2/token', {
  	method: 'POST',
  	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
  	headers: {
  		'Content-Type': 'application/x-www-form-urlencoded'
  	}
  }).then(function (response) {
  	return response.json();

  }).then(function (data) {
    //A second call going to be made to the Api, this one will use the token data to retrive information,
    return fetch(url + parameters, {
      headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    })
  }).then(function (response) {
  	return response.json();

  }).then(function (data) {
    //data is printed to console.log, we can send to function once we have things up and running...
  	console.log('Animals', data);
    populateCards(data);
  }).catch(function (error) {
  	console.log('YOU FOOL!', error );

  });

}

fetchAnimals(animalQParam);


// This function is not being called yet, but will take data returned from the PetFinder API, build the cards, and append them to the screen.
function populateCards(data){
    for (var i = 0; i < data.animals.length; i++){

        petLocation = {
            email: data.animals[i].contact.email,
            phone: data.animals[i].contact.phone,
            address1: data.animals[i].contact.address.address1,
            address2: data.animals[i].contact.address.address2,
            city: data.animals[i].contact.address.city,
            state: data.animals[i].contact.address.state,
            zip: data.animals[i].contact.address.postcode
        };

        petCard = buildPetCard(
            data.animals[i].name,
            data.animals[i].photos[0].full,
            data.animals[i].breeds.primary,
            data.animals[i].age,
            Math.round(data.animals[i].distance),
            petLocation,
            data.animals[i].status,
            data.animals[i].description
            );

        petList.appendChild(petCard);
    }
};