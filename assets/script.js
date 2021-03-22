fetch('https://api.petfinder.com/v2/animals', {
  method : 'GET' ,
  withCredentials: true,
  mode: 'no-cors',
  headers: {
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqNHNDWnV2d3BmZ0JKQkprY1RGMVEyaldLM2ltVDJndHNkT1VpQzNRd0tqdExhaHNZUCIsImp0aSI6IjQ5MWI5NmQ2ZjFmZDI5NDU1YTg5ZjJiNWVjMGFiNTBkNDIxMDRkZmQzMGFjMmQ5NjQwN2RhMmU0NzA4MDdiZTNlN2NkYTg0YzY0NDc5MmNmIiwiaWF0IjoxNjE2MzkxNTM4LCJuYmYiOjE2MTYzOTE1MzgsImV4cCI6MTYxNjM5NTEzOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.CZUGhs6INYQ94ACjSC12bAoD_c5Wn7AKyrqlGLgkhyoFlXiL_p044IeURrVK242vz25WJ2FDDXdEN6c5iBL_4xpGZSLDnn6AYW23myYWRwRXC53Lf-UKu2aP6vbebh-lJ6GjPIM2Ut4KU9Yu8svzLpass--EthWDfHAJmCYVZRisE9YEDx9F07RW5HcV_wzW58XRbfei4XdCyU1tGwxiPSP2rE-86ubr8FRi2cEu4qnOpBQYa_0T0EXBa3OlnhjypyCkR2d84qtjHB0ZAoTi-Kn62bt_Y4ENq1oiumS1ZDQGcdVHE0vFeebRKp2VK0CpY1B-eckncMFBz21mt1EYzw'
  }
}
).then(res =>{
 console.log("RESPONSE", res)
}).catch(e =>{
  console.log("OH! NO", e)
})
//Does not work, I got past one thing but i am having some real issues with authentication,


//Another method I found of getting data was a SDK for JS but even that seems like a dead-end looking for more options...
var petfinder = require("@petfinder/petfinder-js");
var pf = new petfinder.Client({apiKey: " j4sCZuvwpfgBJBJkcTF1Q2jWK3imT2gtsdOUiC3QwKjtLahsYP", secret: "aN0ZxQr0R1rBU7ikZCowpLOuVUQDqE0Z65Ck6Glb"});

pf.animal.search()
    .then(function (response) {
        console.log('data...')
        return response.json()
    })
    .catch(function (error) {
        console.log('oh noooo', error)
    });
