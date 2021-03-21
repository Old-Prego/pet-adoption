const distanceRange = document.getElementById('distanceRange')
const distanceNumber = document.getElementById('distanceNumber')

//Synchronizing length and number of slider
distanceRange.addEventListener("input", syncLengthRange)
distanceNumber.addEventListener("input", syncLengthRange)

function syncLengthRange(e) {
  const value = e.target.value
  distanceNumber.value = value
  distanceRange.value = value
}