const bookLibraryDisplay = document.querySelector('.books')
let searchBar = document.querySelector('#search-bar')

// The Book Class
class Book {
    constructor(coverURL, title, publisher, author, year, pages, readStatus) {
        this.coverURL = coverURL,
            this.title = title,
            this.publisher = publisher,
            this.author = author,
            this.year = year,
            this.pages = pages,
            this.readStatus = readStatus
    }

    createBookCard() {
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
        values.forEach((value, i) => {
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
        readButton.addEventListener('click', ()=> {
            readButton.classList.toggle('read')
            if(readButton.textContent == 'Read') {
                readButton.innerText = 'Not Read' 
            } else if (readButton.textContent == 'Not Read') {
                readButton.innerText = 'Read' 
            }
        })
        const readStatusCheckbox = document.querySelector('#readStatus');
        if (readStatusCheckbox.checked === true || this.readStatus === true) {
            readButton.innerText = 'Read';
            readButton.classList.add('read');
        } else readButton.innerText = 'Not Read';
        readButton.addEventListener('click', () => {
            if (readButton.innerText === 'Not Read') {
                readButton.classList.add('read')
                readButton.innerText = 'Read'
            } else if (readButton.innerText === 'Read') {
                readButton.innerText = 'Not Read'
                readButton.classList.remove('read')
            }
        })
        const thirdDiv = document.createElement('div');
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-icon')
        deleteButton.innerHTML =
            `
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
        `
        deleteButton.addEventListener('dblclick', () => {
            bookLibraryDisplay.removeChild(card)
        })
        thirdDiv.append(readButton)
        thirdDiv.append(deleteButton)
        card.append(firstDiv)
        card.append(secondDiv)
        card.append(thirdDiv)
        bookLibraryDisplay.appendChild(card);
    }

    trimTitle(title) {
        if (this.title.length >= 20) {
            return `${this.title = this.title.slice(0, 20)}...`
        }
        else return this.title
    }
}
const myLibrary = []

const booksData = {
    books: [
        // Existing books
        { imageUrl: "https://covers.openlibrary.org/b/id/8274330-L.jpg", title: "The Very Hungry Caterpillar", type: "Hardback", author: "Eric Carle", year: 1969, pages: 26, status:true},
        { imageUrl: "https://covers.openlibrary.org/b/id/8233270-L.jpg", title: "Where the Wild Things Are", type: "Hardback", author: "Maurice Sendak", year: 1963, pages: 48 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8233370-L.jpg", title: "The Magic Tree House", type: "Paperback", author: "Mary Pope Osborne", year: 1992, pages: 80 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8233650-L.jpg", title: "Junie B. Jones", type: "Hardback", author: "Barbara Park", year: 1992, pages: 128 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8265769-L.jpg", title: "The Chronicles of Narnia", type: "Hardback", author: "C.S. Lewis", year: 1950, pages: 206 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8274953-L.jpg", title: "Diary of a Wimpy Kid", type: "Hardback", author: "Jeff Kinney", year: 2007, pages: 224 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8234230-L.jpg", title: "Percy Jackson & The Olympians", type: "Hardback", author: "Rick Riordan", year: 2005, pages: 400 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8234350-L.jpg", title: "Charlie and the Chocolate Factory", type: "Hardback", author: "Roald Dahl", year: 1964, pages: 160 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8234570-L.jpg", title: "Anne of Green Gables", type: "Hardback", author: "Lucy Maud Montgomery", year: 1908, pages: 320 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8275605-L.jpg", title: "Winnie-the-Pooh", type: "Hardback", author: "A.A. Milne", year: 1926, pages: 160 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780590353427", title: "Harry Potter and the Sorcerer's Stone", type: "Hardback", author: "J.K. Rowling", year: 1997, pages: 309 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780439064873", title: "Harry Potter and the Chamber of Secrets", type: "Hardback", author: "J.K. Rowling", year: 1998, pages: 341 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780439139601", title: "Harry Potter and the Prisoner of Azkaban", type: "Hardback", author: "J.K. Rowling", year: 1999, pages: 435 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780439136365", title: "Harry Potter and the Goblet of Fire", type: "Hardback", author: "J.K. Rowling", year: 2000, pages: 734 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780439358071", title: "Harry Potter and the Order of the Phoenix", type: "Hardback", author: "J.K. Rowling", year: 2003, pages: 870 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780545139700", title: "Harry Potter and the Half-Blood Prince", type: "Hardback", author: "J.K. Rowling", year: 2005, pages: 652 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780545139700", title: "Harry Potter and the Deathly Hallows", type: "Hardback", author: "J.K. Rowling", year: 2007, pages: 759 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238906-L.jpg", title: "The Only One Left", type: "Hardback", author: "Riley Sager", year: 2024, pages: 384 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239006-L.jpg", title: "The Golden Enclaves", type: "Hardback", author: "Naomi Novik", year: 2024, pages: 448 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239106-L.jpg", title: "The Nine Lives of Rose Napolitano", type: "Hardback", author: "Donna Freitas", year: 2024, pages: 368 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239206-L.jpg", title: "The Echo of Old Books", type: "Hardback", author: "Barbara Davis", year: 2024, pages: 416 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239306-L.jpg", title: "A Court of Shadows", type: "Hardback", author: "Sarah J. Maas", year: 2024, pages: 512 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239406-L.jpg", title: "The Paris Betrayal", type: "Hardback", author: "James Patterson", year: 2024, pages: 368 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239506-L.jpg", title: "The Last One", type: "Hardback", author: "J.A. Warner", year: 2024, pages: 304 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239606-L.jpg", title: "The Silent Witness", type: "Hardback", author: "Linda Castillo", year: 2024, pages: 416 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239706-L.jpg", title: "The Secret Garden on 81st Street", type: "Hardback", author: " Ivy Noelle Weir", year: 2024, pages: 288 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8239806-L.jpg", title: "One Last Secret", type: "Hardback", author: "Wendy Walker", year: 2024, pages: 336 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237906-L.jpg", title: "Martyr!", type: "Hardback", author: "Kaveh Akbar", year: 2024, pages: 352 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238006-L.jpg", title: "Come and Get It", type: "Hardback", author: "Kiley Reid", year: 2024, pages: 384 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238106-L.jpg", title: "The Book of Love", type: "Hardback", author: "Kelly Link", year: 2024, pages: 400 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238206-L.jpg", title: "The Last Murder at the End of the World", type: "Hardback", author: "Stuart Turton", year: 2024, pages: 464 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238306-L.jpg", title: "Creation Lake", type: "Hardback", author: "Rachel Kushner", year: 2024, pages: 328 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238406-L.jpg", title: "You Like It Darker", type: "Hardback", author: "Stephen King", year: 2024, pages: 416 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238506-L.jpg", title: "Somewhere Beyond the Sea", type: "Hardback", author: "T.J. Klune", year: 2024, pages: 352 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238606-L.jpg", title: "House of Flame and Shadow", type: "Hardback", author: "Sarah J. Maas", year: 2024, pages: 512 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238706-L.jpg", title: "Funny Story", type: "Hardback", author: "Emily Henry", year: 2024, pages: 384 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8238806-L.jpg", title: "The Women", type: "Hardback", author: "Kristin Hannah", year: 2024, pages: 464 },
        { imageUrl: "https://images.penguinrandomhouse.com/cover/9780590353427", title: "Harry Potter and the Sorcerer's Stone", type: "Hardback", author: "J.K. Rowling", year: 1997, pages: 309 },
        { imageUrl: "https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg", title: "Atomic Habits", type: "Hardback", author: "James Clear", year: 2018, pages: 320 },
        { imageUrl: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg", title: "The Subtle Art of Not Giving a F*ck", type: "Hardback", author: "Mark Manson", year: 2016, pages: 224 },
        { imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81vpsIs58WL.jpg", title: "The Midnight Library", type: "Hardback", author: "Matt Haig", year: 2020, pages: 304 },
        { imageUrl: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg", title: "The Alchemist", type: "Paperback", author: "Paulo Coelho", year: 1988, pages: 208 },
        { imageUrl: "https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg", title: "Becoming", type: "Hardback", author: "Michelle Obama", year: 2018, pages: 448 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8226191-L.jpg", title: "To Kill a Mockingbird", type: "Paperback", author: "Harper Lee", year: 1960, pages: 281 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8231856-L.jpg", title: "Pride and Prejudice", type: "Paperback", author: "Jane Austen", year: 1813, pages: 279 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8231996-L.jpg", title: "The Great Gatsby", type: "Paperback", author: "F. Scott Fitzgerald", year: 1925, pages: 180 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8235116-L.jpg", title: "Moby-Dick", type: "Paperback", author: "Herman Melville", year: 1851, pages: 635 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8235326-L.jpg", title: "War and Peace", type: "Paperback", author: "Leo Tolstoy", year: 1869, pages: 1225 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8235696-L.jpg", title: "Crime and Punishment", type: "Paperback", author: "Fyodor Dostoevsky", year: 1866, pages: 430 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8235806-L.jpg", title: "The Catcher in the Rye", type: "Paperback", author: "J.D. Salinger", year: 1951, pages: 214 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8235906-L.jpg", title: "The Hobbit", type: "Paperback", author: "J.R.R. Tolkien", year: 1937, pages: 310 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236006-L.jpg", title: "Brave New World", type: "Paperback", author: "Aldous Huxley", year: 1932, pages: 268 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236106-L.jpg", title: "The Lord of the Rings", type: "Paperback", author: "J.R.R. Tolkien", year: 1954, pages: 1178 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236206-L.jpg", title: "Jane Eyre", type: "Paperback", author: "Charlotte Brontë", year: 1847, pages: 500 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236306-L.jpg", title: "Wuthering Heights", type: "Paperback", author: "Emily Brontë", year: 1847, pages: 416 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236406-L.jpg", title: "The Odyssey", type: "Paperback", author: "Homer", year: -800, pages: 541 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236506-L.jpg", title: "The Divine Comedy", type: "Paperback", author: "Dante Alighieri", year: 1320, pages: 798 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8236906-L.jpg", title: "The Road", type: "Paperback", author: "Cormac McCarthy", year: 2006, pages: 287 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237006-L.jpg", title: "Life of Pi", type: "Paperback", author: "Yann Martel", year: 2001, pages: 336 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237106-L.jpg", title: "The Kite Runner", type: "Paperback", author: "Khaled Hosseini", year: 2003, pages: 372 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237206-L.jpg", title: "Memoirs of a Geisha", type: "Paperback", author: "Arthur Golden", year: 1997, pages: 434 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237306-L.jpg", title: "A Thousand Splendid Suns", type: "Paperback", author: "Khaled Hosseini", year: 2007, pages: 372 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237406-L.jpg", title: "The Girl on the Train", type: "Paperback", author: "Paula Hawkins", year: 2015, pages: 336 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237506-L.jpg", title: "Gone Girl", type: "Paperback", author: "Gillian Flynn", year: 2012, pages: 422 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237606-L.jpg", title: "Big Little Lies", type: "Paperback", author: "Liane Moriarty", year: 2014, pages: 460 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237706-L.jpg", title: "The Book Thief", type: "Paperback", author: "Markus Zusak", year: 2005, pages: 552 },
        { imageUrl: "https://covers.openlibrary.org/b/id/8237806-L.jpg", title: "The Fault in Our Stars", type: "Paperback", author: "John Green", year: 2012, pages: 313 }
    ]
};


// Generate and append books to the array
booksData.books.forEach(bookData => {
    const book = new Book(
        bookData.imageUrl,
        bookData.title,
        bookData.type,
        bookData.author,
        bookData.year,
        bookData.pages
    );
    myLibrary.push(book);
});

// UI
const formWrapper = document.querySelector('.form-wrapper');
const formElement = document.querySelector('form');
const addBookButton = document.querySelector('#addBook');
const closeButton = document.querySelector('#closeButton');
const submitButton = document.querySelector('button[type="submit"]')
const urlFormGroup = document.querySelector('form > .form-group:nth-of-type(1):not(header)')


addBookButton.addEventListener('click', () => {
    formWrapper.style.display = 'flex';
    formElement.classList.add('slide-in-top')
})

closeButton.addEventListener('click', () => {
    formWrapper.style.display = 'none';
})

formElement.addEventListener('submit', function (event) {
    event.preventDefault()
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
    const newBook = new Book(urlDetails, titleDetails, publisherDetails, authorDetails, yearDetails, pagesDetails, readStatus);
    newBook.createBookCard()
    myLibrary.push(newBook)
    formWrapper.style.display = 'none';

}

searchBar.addEventListener('input', () => {
    searchResults = myLibrary.filter(item => {
        return item = item.title.toLowerCase().includes(searchBar.value.toLowerCase())
    });
    bookLibraryDisplay.innerHTML = ''
    searchResults.forEach(item => {
        item.createBookCard()
    })
})

myLibrary.forEach(item => {
    item.createBookCard()
})

function handleImageURL(element){
    const imageElement = document.querySelector('#img')
    imageElement.src = element.value
}

urlInputElement = document.querySelector('#url')
urlInputElement.addEventListener('input', () => {
    handleImageURL(urlInputElement);

    const regex = /^https:\/\//;
    const imageUrlRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

    if (!regex.test(urlInputElement.value)) {
        urlInputElement.setCustomValidity(
            'This URL is not secure. It is advisable to use HTTPS connections.'
        );
    } else if (!imageUrlRegex.test(urlInputElement.value)) {
        urlInputElement.setCustomValidity(
            'This URL does not point to a valid image. Please use a valid image URL (e.g., ending with .jpg, .png).'
        );
    } else {
        // Clear any existing custom validation message if the input is valid
        urlInputElement.setCustomValidity('');
    }

    // Show the validation message if any
    urlInputElement.reportValidity();
});


titleInputElement = document.querySelector('#title')