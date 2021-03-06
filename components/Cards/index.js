// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios
  .get('https://lambda-times-backend.herokuapp.com/articles')
  .then(response => {
    console.log(response);
    let cardContainer = document.querySelector('.cards-container');
    let carddata = Object.values(response.data.articles);
    carddata.forEach(element => {
      element.forEach(item => {
        cardContainer.appendChild(cardMaker(item));
      });
    });
  })
  .catch(error => {
    console.log(error);
  });

const cardMaker = response => {
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  const newtitle = document.createElement('div');
  newtitle.classList.add('headline');
  newtitle.textContent = response.headline;
  newCard.appendChild(newtitle);

  const newAuthor = document.createElement('div');
  newAuthor.classList.add('author');
  newCard.appendChild(newAuthor);

  const newImg = document.createElement('div');
  newImg.classList.add('img-container');
  newAuthor.appendChild(newImg);

  const newImageLink = document.createElement('img');
  newImageLink.setAttribute('src', response.authorPhoto);
  newImg.appendChild(newImageLink);

  const newWriter = document.createElement('span');
  newWriter.textContent = `By ${response.authorName}`;
  newAuthor.appendChild(newWriter);

  return newCard;
};
console.log(cardMaker);
