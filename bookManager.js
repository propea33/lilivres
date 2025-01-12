class BookManager {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getTotalPages() {
        return this.books.reduce((sum, book) => sum + book.pages, 0);
    }

    getAllBooks() {
        return this.books;
    }

    getBookById(id) {
        return this.books.find(book => book.id === id);
    }
}
