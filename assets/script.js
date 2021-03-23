
// Template tag parser courtesy of Nate
// This takes template tags and parses them into HTML elements that are appendable to the current scope
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;

var petList = document.getElementById("petList");

function buildPetCard(petName,petImg,petBreed,petAge,petOwners,petDist,petLoc){
    
    
    let petCard = html`

        <div id="${petName}" class="petCard card cell medium-6 large-4">

            <h3 class="card-divider">${petName}</h3>

            <div class="card-section">
                <img src="${petImg}" alt="Picture of ${petName}" width="200px" height="200px">
            </div>

            <div class="card-section">

                <p>Breed: ${petBreed}</p>
                <p>Age: ${petAge}</p>
                <p>Previous Owners: ${petOwners}</p>
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

var petLocation = {
    shelter: "Luke's Shelter",
    address1: "315 6th Ave E",
    address2: "Apt 6",
    city: "Alexandria",
    state: "MN",
    zip: "56308"
};

var petName = "Sanders";
var petImg = "http://placehold.it/200x200";
var petBreed = "Tabby";
var petAge = "4";
var petOwners = "1";
var petDist = "20";

var petCard = buildPetCard(petName,petImg,petBreed,petAge,petOwners,petDist,petLocation);
petList.appendChild(petCard);

// Search Params kinda look like this:
http://127.0.0.1:5500/pet-adoption/results.html?cityState=Alexandria%2C+MN&zip=56308&animal=Either&distance=50&dogBreed1=on&dogBreed2=on&dogBreed4=on&catBreed2=on&catBreed3=on&ownerYesNo=on&min=1&max=20&min=800&max=7000

var params = new URLSearchParams(document.location.search.substring(1));
var qCityState = params.get("cityState");
var qZIP = params.get("zip");
var qAnimal = params.get("animal");
var qDistance = params.get("distance");
var qDogB1 = params.get("dogBreed1");
var qDogB2 = params.get("dogBreed2");
var qDogB3 = params.get("dogBreed3");
var qDogB4 = params.get("dogBreed4");
var qCatB1 = params.get("catBreed1");
var qCatB2 = params.get("catBreed2");
var qCatB3 = params.get("catBreed3");
var qCatB4 = params.get("catBreed4");
var qOwner = params.get("ownerYesNo");
var qMinAge = params.get("minAge");
var qMaxAge = params.get("maxAge");
var qminPrice = params.get("minPrice");
var qMaxPrice = params.get("maxPrice");

// For toggle switches, TRUE = "on" and FALSE = null. Make sure to convert this for the end parameters.
