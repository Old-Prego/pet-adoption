var key = "j4sCZuvwpfgBJBJkcTF1Q2jWK3imT2gtsdOUiC3QwKjtLahsYP";
var secret = "aN0ZxQr0R1rBU7ikZCowpLOuVUQDqE0Z65Ck6Glb";

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
  return fetch('https://api.petfinder.com/v2/animals', {
    headers: {
      'Authorization': data.token_type + ' ' + data.access_token,
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
  })
}).then(function (response) {
	return response.json();

}).then(function (data) {
	console.log('Animals', data);
  console.log(data.animals.type)
}).catch(function (Error) {
	console.log('YOU FOOL!', err);

});
