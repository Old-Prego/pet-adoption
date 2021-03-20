const url = "https://api.petfinder.com/v2/types/dog";
fetch(url, {
  headers: {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqNHNDWnV2d3BmZ0JKQkprY1RGMVEyaldLM2ltVDJndHNkT1VpQzNRd0tqdExhaHNZUCIsImp0aSI6ImU1MTE5OGQzMDM2ODU4ZDA5M2ZmODNlMDkwZjNlZmM3YTIwNmU4Zjk5ZjZlOTg0ODk5M2RjMGM5MDQwNTY4ZjExZGUxNTdmNmFlNTk4MDJkIiwiaWF0IjoxNjE2MjYxNTQxLCJuYmYiOjE2MTYyNjE1NDEsImV4cCI6MTYxNjI2NTE0MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.yCmthYyGDPHz-4SZHRPjYKw-vjumv7iN9xGSSDnTorMOonAuvXp6-DsUX8bhroXGU1xw9hOyACjEZqWw-s0kaliAkpXb0zb0GWHVrFEKHyy9Ft_EDf4Nxjq0crEgxguuEZdcfMvc59fmO99CpzMiPjUdDe6lTMdEhk2DhGaVK6fK4jFA26UGXSSwWjIDbjHkgGvrMp5VCe-tGAtwG-d60qHFxU-b5T4DL1hs2wWwjB6OYKevDb-S8HoIGLucdXmS-5JLN8-AURYE7OmWRfoz2vMF6A8Jh4iA9Bf5vM3J1XaFwSTQXADXB7hia3B1uuBaDkIxW1q9c1mpGQTfQB1deg"

  }
})
.then(resp => resp.json())
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
