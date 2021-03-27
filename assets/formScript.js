const form = document.forms.petForm;

function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataString = new URLSearchParams(formData).toString();
    console.log(dataString);
    const queryString = "./results.html?" + dataString;
    window.location = queryString;
   
}

form.addEventListener('submit',handleSubmit);