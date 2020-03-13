//sample data
var booksArray = [{
        id: 1,
        title: 'Book1',
        author: 'Author1',
        lender: 'userC',
        borrower: 'UserB',
        requester: 'UserC'
    },
    {
        id: 2,
        title: 'Book2',
        author: 'Author2',
        lender: 'UserC',
        borrower: '--',
        requester: '--'
    },
    {
        id: 3,
        title: 'Book3',
        author: 'Author3',
        lender: 'userD',
        borrower: 'UserC',
        requester: 'UserB'
    },
    {
        id: 4,
        title: 'Book4',
        author: 'Author4',
        lender: 'UserA',
        borrower: '--',
        requester: '--'
    },
    {
        id: 5,
        title: 'Book5',
        author: 'Author5',
        lender: 'UserA',
        borrower: '--',
        requester: '--'
    },
    {
        id: 6,
        title: 'Book6',
        author: 'Author6',
        lender: 'UserB',
        borrower: 'UserA',
        requester: '--'
    }
];

class BookClub {
    constructor() {
        this.availableBooks = booksArray.map(book => {
            return new Book(book.id, book.title, book.author, book.lender, book.borrower, book.requester);
        });
        this.loggedInUser = document.getElementById('username').value
    }
    addBook = (bookTitle, bookAuthor) => {
        let id = this.availableBooks.length + 1;
        let lender = this.loggedInUser
        let newBook = new Book(id, bookTitle, bookAuthor, lender);
        this.availableBooks.push(newBook);
        let addedRow = getTableRow(newBook)

        let tableBody = document.getElementById('books-table-content');
        var newRow = tableBody.insertRow(this.availableBooks.length - 1);
        newRow.innerHTML = addedRow;

    };
    deleteBook = (id) => {
        this.availableBooks = this.availableBooks.filter(book => {
            book.id == id
        });
    };
}

class Book {
    constructor(id, title, author, lender = "", borrower = "", requester = "") {
        this.id = id;
        this.title = title;
        this.author = author;
        this.lender = lender;
        this.borrower = borrower;
        this.requester = requester;
        this.status = null;
        this.timings = {
            borrowTime: null,
            returnTime: null,
            requestTime: null,
            borrowDuration: 0
        };
    }

    borrowBook = (borrower, borrowDuration) => {
        this.borrower = borrower;
        this.timings.borrowDuration = borrowDuration;
        //mark book status borrowed
    };
    returnBook = () => {
        this.timings.returnTime = new Date().getTime();
        //mark book status available
    };
    requestNext = (requester) => {
        this.requester = requester;
        this.timings.requestTime = new Date().getTime();
        // mark book status requested
    };
    setBookStatus = (status) => {
        this.status = status;
    }
}

var bookClub = new BookClub();

loginUser = () => {
    let username = document.getElementById('username').value;
    let loggedInUserDiv = document.getElementById('loggedInUser');
    loggedInUserDiv.innerHTML = username;
}

onLoad = () => {
    var contentDiv = document.getElementsByClassName('books-table-content')[0];
    let contentString = contentDiv.innerHTML;

    bookClub.availableBooks.forEach(book => {
        contentString = contentString + getTableRow(book);
    });

    contentString = contentString + renderAddBook(bookClub);
    contentDiv.innerHTML = contentString;
}

addBook = () => {
    let bookTitle = document.getElementById('book-title').value;
    let bookAuthor = document.getElementById('book-author').value;
    bookClub.addBook(bookTitle, bookAuthor);

}

getTableRow = (bookData) => {
    let bookKeys = ['id', 'title', 'author', 'lender', 'borrower', 'requester'];
    let row = '<tr>';
    bookKeys.forEach(key => {
        if (typeof bookData[key] !== "function") {
            row = row + '<td>' + bookData[key] + '</td>';
        }
    })
    row = row + '</tr>'
    return row;
}

renderAddBook = () => {
    var username = document.getElementById('username').value;
    username = username ? username : "";

    let bookId = '<td>' + parseInt(bookClub.availableBooks.length + 1) + '</td>';
    let bookTitleSting = '<td><input id="book-title" type="text" placeholder="title" class="book-info-input" /></td>';
    let bookAuthor = '<td><input id="book-author" type="text" placeholder="author" class="book-info-input" /></td>';
    let bookLender = '<td id="loggedInUser">' + username + '</td>';
    let bookBorrower = '<td>-</td>';
    let addBookButton = '<td><input type="button" class="submit-button" value="Add book" onclick="addBook()"/></td>';

    let addBookActionString = '<tr>' + bookId + bookTitleSting + bookAuthor + bookLender + bookBorrower + addBookButton + '</tr>';
    return addBookActionString;
}