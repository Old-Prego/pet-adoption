// Template tag parser courtesy of Nate
// This takes template tags and parses them into HTML elements that are appendable to the current scope
const html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;

var petList = document.getElementById("petList");

function buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLoc, petPrice) {


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
                    <span class="price">$${petPrice} | </span>
                    <span class="age">${petAge}yo | </span>
                    <span class="distance">${petDist}mi away</span>
                </div>
                <p>Insert Description</p>
                </br>
                <p class='animal-details'>${petLoc.address1}, ${petLoc.address2}</p>
                <p class='animal-details'>${petLoc.city}, ${petLoc.state} ${petLoc.zip}</p>
            </div>
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
var petImg = "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg";
var petBreed = "Tabby";
var petAge = "4";
var petOwners = "1";
var petDist = "20";
var petPrice = '500';

var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);

//For testing formatting
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);
var petCard = buildPetCard(petName, petImg, petBreed, petAge, petOwners, petDist, petLocation, petPrice);
petList.appendChild(petCard);