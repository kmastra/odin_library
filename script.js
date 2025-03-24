
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

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

console.log(myLibrary);