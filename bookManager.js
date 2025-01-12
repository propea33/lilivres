class BookManager {
    constructor() {
        // Charger les livres depuis le localStorage au démarrage
        this.books = this.loadBooks();
    }

    // Charger les livres depuis le localStorage
    loadBooks() {
        const savedBooks = localStorage.getItem('lilivres-books');
        return savedBooks ? JSON.parse(savedBooks) : [];
    }

    // Sauvegarder les livres dans le localStorage
    saveBooks() {
        localStorage.setItem('lilivres-books', JSON.stringify(this.books));
    }

    addBook(book) {
        this.books.push(book);
        this.saveBooks(); // Sauvegarder après chaque ajout
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

    // Nouvelle méthode pour supprimer un livre
    deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();
    }

    updateBook(updatedBook) {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
        this.books[index] = updatedBook;
        this.saveBooks();
        return true;
    }
    return false;
}
    
}
