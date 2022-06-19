 const BASE_URL = 'https://restcountries.com/v3.1'



 const searchParams = new URLSearchParams({
    fields:   `name,capital,population,flags,languages`
    });




 export function fetchCountries(name) {
   return fetch(`${BASE_URL}/name/${name}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
}


// export default {fetchCountries} 

