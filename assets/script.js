
// General global variables. petList gets the location of where the HTML templates will be dumped.
var petCard;
var petLocation;
var petList = document.getElementById("petList");

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
function buildPetCard(petName,petImg,petBreed,petAge,petDist,petLoc, petStatus){
    
    let petCard = html`

        <div id="${petName}" class="petCard card cell medium-6 large-4">

            <h3 class="card-divider">${petName}</h3>

            <div class="card-section">
                <img src="${petImg}" alt="Picture of ${petName}" width="200px" height="200px">
            </div>

            <div class="card-section">

                <p>Breed: ${petBreed}</p>
                <p>Age: ${petAge}</p>
                <p>Distance Away: ${petDist} miles</p>

                <div id="addressCont">
                    <h5>${petLoc.shelter}</h5>
                    <p>${petLoc.address1}</p>
                    <p>${petLoc.address2}</p>
                    <p>${petLoc.city}</p>
                    <p>${petLoc.state}</p>
                    <p>${petLoc.zip}</p>
                </div>

            </div>
        </div>`

    return petCard;
};

// Space for the PetFinder API fetch

function fetchAnimals(){

  var key = "j4sCZuvwpfgBJBJkcTF1Q2jWK3imT2gtsdOUiC3QwKjtLahsYP";
  var secret = "aN0ZxQr0R1rBU7ikZCowpLOuVUQDqE0Z65Ck6Glb";
  var url = "https://api.petfinder.com/v2/animals"
  let parameters = queryParmeters()

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
  	console.log('Acess token', data);
    console.log(data.token_type)
    console.log(data.access_token)
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
  }).catch(function (error) {
  	console.log('YOU FOOL!', error );

  });

}

//Get inut from forum and orgnizes it inorder to add it to the url as parametes...
function queryParmeters(){

  query = `?type=${qAnimal}`
  if (qAnimal == "dog"){
    if (qDogBreed != null){
      query = query + `&breed=${qDogBreed}`
    }
  }else if (qAnimal == "cat"){
    if (qCatBreed != null){
      query = query + `&breed=${qCatBreed}`
    }
  }
  if (qOwner != null ){
    query = query + `&owner=${qOwner}`
  }
  if (qDistance != null){
    query = query + `&distance=${qDistance}`
  }
  if (qAge != null){
    query = query + `&age=${qAge}`
  }
  if (qCityState == null){
    query = query + `&cityState=${qCityState}`
  }
  return query
}


// This function is not being called yet, but will take data returned from the PetFinder API, build the cards, and append them to the screen.
function populateCards(data){
    for (var i = 0; i < data.length; i++){

        petLocation = {
            email: data[i].contact.email,
            phone: data[i].contact.phone,
            address1: data[i].contact.address.address1,
            address2: data[i].contact.address.address2,
            city: data[i].contact.address.city,
            state: data[i].contact.address.state,
            zip: data[i].contact.address.postcode
        };

        petCard = buildPetCard(
            data[i].name,
            data[i].photos.full,
            data[i].breed.primary,
            data[i].age,
            data[i].distance,
            petLocation,
            data[i].status
            );

        petList.appendChild(petCard);
    }
};
