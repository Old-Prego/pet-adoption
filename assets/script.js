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
var qMinAge = params.get("minAge");
var qMaxAge = params.get("maxAge");
var qminPrice = params.get("minPrice");
var qMaxPrice = params.get("maxPrice");


// Template tag parser courtesy of Nate
// This takes template tags and parses them into HTML elements that are appendable to the current scope
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;


// This is the actual template for the HTML, with variables passed to it.
function buildPetCard(petName,petImg,petBreed,petAge,petDist,petLoc){
    
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
            petLocation
            );

        petList.appendChild(petCard);
    }
};
