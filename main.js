const storageKey = 'storedBooks';
const bookList = document.querySelector("#book-list");

/* Book Class: Represents a Book */
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

/* UI class : Handles UI Tasks */
class UI {
    static displayBooks() {
        let storedBooks = [];
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(storedBooks));
        } else {
            storedBooks = localStorage.getItem(storageKey);
            storedBooks = JSON.parse(storedBooks);
        }

        storedBooks.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="align-middle">${book.title}</td>
            <td class="align-middle">${book.author}</td>
            <td class="align-middle">${book.isbn}</td>
            <td class="text-center"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        bookList.appendChild(row);
    }

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static clearFileds() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === '' || author === '' || isbn === '')

    const book = new Book(title, author, isbn);

    UI.addBookToList(book);

    UI.clearFileds();
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});