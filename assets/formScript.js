const form = document.forms.petForm;
var dogSelect = document.getElementById("dogBreedSelect");
var catSelect = document.getElementById("catBreedSelect");
var animalType = document.getElementById("animalSelect");
var catList = document.getElementById("catBreeds");
var dogList = document.getElementById("dogBreeds");

function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataString = new URLSearchParams(formData).toString();
    console.log(dataString);
    const queryString = "./results.html?" + dataString;
    window.location = queryString;

}

//Breed Api Fetch, grabs breeds based on Animal of choice and returns them as search parameters
function fetchDogBreeds(){
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
      return fetch(url + "dog/breeds", {
        headers: {
          'Authorization': data.token_type + ' ' + data.access_token,
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
      for (i = 0 ; i < data.breeds.length; i++){
        //direct the data to drop down
        var dogOpt = document.createElement("option");
        dogOpt.textContent = data.breeds[i].name;
        dogOpt.value = data.breeds[i].name;
        dogSelect.appendChild(dogOpt);
      }
    }).catch(function (error) {
        console.log('YOU FOOL!', error );

    });
  }

  //Breed Api Fetch, grabs breeds based on Animal of choice and returns them as search parameters
  function fetchCatBreeds(){
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
      return fetch(url + "cat/breeds", {
        headers: {
          'Authorization': data.token_type + ' ' + data.access_token,
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
    }).then(function (response) {
        return response.json();

    }).then(function (data) {
      for (i = 0 ; i < data.breeds.length; i++){
        //direct the data to drop down
        var catOpt = document.createElement("option");
        catOpt.textContent = data.breeds[i].name;
        catOpt.value = data.breeds[i].name;
        catSelect.appendChild(catOpt);
      }
    }).catch(function (error) {
        console.log('YOU FOOL!', error );

    });
  }

  //Controlls what is viewable to the user so that the only breeds that appear are from the animal type desired, 
  function hideDropDown(){
    if (animalType.value == 'cat'){
      catList.classList.remove("hide")
      dogList.classList.add("hide")
    }else if (animalType.value == 'dog'){
      dogList.classList.remove("hide")
      catList.classList.add("hide")
    }
  }

  animalType.addEventListener("change", hideDropDown)
  form.addEventListener('submit',handleSubmit);
  fetchDogBreeds();
  fetchCatBreeds();
