

export function makeImageMarkup (chooseImage) {
    return chooseImage.hits
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
       
      return `  
 <a class="gallery__item" href="${largeImageURL}">
 <img src="${webformatURL}" alt="${tags}" loading="lazy" />

 <div class="info">
  <p class="info-item">
    <b>  <span class="bold">Likes </span><span class="simple">${likes}</span></b>
  </p>
   <p class="info-item">
   <b>  <span class="bold">Views</span> <span class="simple">${views}</span></b>
  </p>
  <p class="info-item">
    <b>  <span class="bold">Comments</span> <span class="simple">${comments}</span></b>
  </p>
  <p class="info-item">
    <b> 
    <span class="bold">    Downloads</span>
    <span class="simple">${downloads}</span></b>
  </p>
</div>
</a> 
          `;    
        })
    .join("");
}



// {/* <div class="container">
//   <article class="post">
//   <a class="gallery__item" href="${largeImageURL}">
//         <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>/>
//       </a>
//   </article>
// </div> */}