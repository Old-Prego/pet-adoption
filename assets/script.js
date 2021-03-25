
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
