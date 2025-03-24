function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.report = function() {
        if (this.read == true) {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, read it`;
        }
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    uniqueId = crypto.randomUUID();
    newBook = new Book (uniqueId, title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'cart';
        card.innerHTML = `
            <h2> ${book.title}</h2>
            <h3>${book.author}</h3>
            <p>${book.pages} pages long</p>
            <p>${book.read ? 'Read' : 'Not read yet'}!</p>
            <div class="book-buttons">
                <button class="read-btn" data-id="${book.id}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
                <button class="delete-btn" data-id="${book.id}">Delete Book</button>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    
    const modal = document.querySelector('#bookModal');
    const newBtn = document.querySelector('#newBookBtn');
    const span = document.querySelector('#close');
    const form = document.getElementById('bookForm');

    newBtn.addEventListener('click', function () {
        modal.style.display = "block";
    });

    span.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.querySelector('.container').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const bookId = e.target.dataset.id;
            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        }
        
        if (e.target.classList.contains('read-btn')) {
            const bookId = e.target.dataset.id;
            const book = myLibrary.find(book => book.id === bookId);
            if (book) {
                book.read = !book.read;
                displayBooks();
            }
        }
    });

    form.onsubmit = function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = parseInt(document.getElementById('pages').value);
        const read = document.getElementById('read').checked;

        addBookToLibrary(title, author, pages, read);
        
        displayBooks();
        
        modal.style.display = "none";
        form.reset();
    }
});

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);