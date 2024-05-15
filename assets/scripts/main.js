
const bookLibraryDisplay = document.querySelector('.books')
let searchBar = document.querySelector('#search-bar')

const book1 = new Book('https://i4.books-express.ro/bt/9780857504791/spare.jpg', 'Spare', 'Hardback', 'Prince Harry', 2023, 250);
const book2 = new Book('https://i3.books-express.ro/bt/9780241506431/the-dc-book.jpg', 'The DC Book', 'Hardback', 'Stephen Wiacek', 2021, 30);
const book3 = new Book('https://m.media-amazon.com/images/I/813iy9fGBQL._AC_UF894,1000_QL80_.jpg', 'Between a rock and a hard place', 'Hardback', 'Aron Rolstin', 354, 10, true)

let myLibrary = [book1, book2, book3];

//Defined a title trimmer function on the Object prototype to use it globally
Object.prototype.trimTitle = function(title) {
    this.title = title;
    if(title.length >= 19) {
       return title = title.substr(0,20) + '...'
    }else return title
  }


// The Book Constructor
function Book(coverURL, title, publisher, author, year, pages, readStatus) {
  this.coverURL = coverURL;
  this.title = title
  this.publisher = publisher;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.readStatus = readStatus;

  this.createBookCard = function() {
    const card = document.createElement('div');
    card.classList.add('book-card');
    const firstDiv = document.createElement('div');
    const bookCover = document.createElement('img');
    bookCover.setAttribute('src', `${this.coverURL}`);
    firstDiv.appendChild(bookCover);
    const secondDiv = document.createElement('div');
    const titleDisplay = document.createElement('h3');
    titleDisplay.setAttribute('title', `${this.title}`)
    this.title = this.trimTitle(title); 
    titleDisplay.innerText = this.title;
    secondDiv.appendChild(titleDisplay);
    const values = [this.author, this.publisher, this.year, this.pages]
    const labels = ['Author', 'Publisher', 'Year', 'Pages']
    values.forEach((value,i) => {
       const div = document.createElement('div');
       div.classList.add('info-wrapper')
       const label = document.createElement('p');
       label.innerText = labels[i]
       div.appendChild(label);
       const valueDisplay = document.createElement('p');
       valueDisplay.innerText = value
       div.appendChild(valueDisplay)
       secondDiv.appendChild(div)
    })
    const readButton = document.createElement('button');
    const readStatusCheckbox = document.querySelector('#readStatus');
    console.log(readStatusCheckbox.checked)
    if(readStatusCheckbox.checked === true || this.readStatus === true) {
        readButton.innerText = 'Read';
        readButton.classList.add('read');
    } else readButton.innerText = 'Not Read';
    readButton.addEventListener('click', ()=> {
        if(readButton.innerText === 'Not Read') {
            readButton.classList.add('read')
            readButton.innerText = 'Read'
        } else if(readButton.innerText === 'Read') {
            readButton.innerText = 'Not Read'
            readButton.classList.remove('read')
        }
    })
    const thirdDiv = document.createElement('div');
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-icon')
    deleteButton.innerHTML = 
    `
    <span class="material-symbols-outlined">
    delete
    </span>
    `
    deleteButton.addEventListener('dblclick', ()=> {
         bookLibraryDisplay.removeChild(card)
    })
    thirdDiv.append(readButton)
    thirdDiv.append(deleteButton)
    card.append(firstDiv)
    card.append(secondDiv)
    card.append(thirdDiv)
    bookLibraryDisplay.appendChild(card);
  }

}



// UI
const formWrapper = document.querySelector('.form-wrapper');
const formElement = document.querySelector('form');
const addBookButton = document.querySelector('#addBook');
const closeButton = document.querySelector('#closeButton');
const submitButton = document.querySelector('button[type="submit"]')


addBookButton.addEventListener('click', ()=> {
    formWrapper.style.display = 'flex';
    formElement.classList.add('slide-in-top')
})

closeButton.addEventListener('click', ()=> {
    formWrapper.style.display = 'none';
})

formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    addBookToLibrary()
    formElement.reset()
})

function addBookToLibrary() {
    const urlDetails = document.querySelector('#url').value
    const titleDetails = document.querySelector('#title').value
    const authorDetails = document.querySelector('#author').value
    const publisherDetails = document.querySelector('#publisher').value
    const yearDetails = document.querySelector('#year-of-publication').value
    const pagesDetails = document.querySelector('#number-of-pages').value
    const readStatus = document.querySelector('#readStatus').value
    const newBook = new Book(urlDetails,titleDetails, publisherDetails, authorDetails, yearDetails, pagesDetails, readStatus);
    newBook.createBookCard()
    myLibrary.push(newBook)
    formWrapper.style.display = 'none';
    
}






searchBar.addEventListener('input', ()=> {  
    searchResults = myLibrary.filter(item => {
    return item = item.title.includes(searchBar.value)
});
  bookLibraryDisplay.innerHTML = ''
  searchResults.forEach(item => {
    item.createBookCard()
})
})

myLibrary.forEach(item => {
    item.createBookCard()
})




