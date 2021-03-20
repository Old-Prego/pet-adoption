// This section will be for appending cards onto the main page

// var myHTMLTemplate = (petName,petImg,petBreed,petAge,petOwners,petDist,petLoc) =>
//     <article>
//         <h4>${petName}</h4>
//         <img
//     </article>
var petLocation = {
    shelter: "Luke's Shelter",
    address1: "315 6th Ave E",
    address2: "Apt 6",
    city: "Alexandria",
    state: "MN",
    zip: "56308"
};


// Template tag parser courtesy of Nate
// This takes template tags and parses them into HTML elements that are appendable to the current scope
helperconst html = (strings, ...values) => new DOMParser().parseFromString(strings.map((string, i) => strings[i] + values[i]).join(''), "text/html").body.firstChild;

function buildPetCard(petName,petImg,petBreed,petAge,petOwners,petDist,petLoc){
    

    let petCard = html`

        <div id="${petName}" class="petCard">
            <h3>${petName}</h3>
            <img src="${petImg}" alt="Picture of ${petName}" width="450px" height="500px">
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
        </div>`
}