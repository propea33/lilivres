// main.js
const bookManager = new BookManager();
const modalManager = new ModalManager();
const uiManager = new UIManager(bookManager);
const themeManager = new ThemeManager();

const filmManager = new FilmManager();
let currentSection = 'books'; // 'books' ou 'films'

window.switchSection = () => {
    const switchButton = document.getElementById('switchButton');
    const addButtonText = document.getElementById('addButtonText');
    const totalPages = document.getElementById('totalPages');
    
    if (currentSection === 'books') {
        currentSection = 'films';
        switchButton.textContent = 'Lilifilms';
        addButtonText.textContent = 'Ajouter un Film';
        totalPages.textContent = `Durée totale visionnée: ${filmManager.getTotalDuration()} minutes`;
        uiManager.updateFilmsGrid();
    } else {
        currentSection = 'books';
        switchButton.textContent = 'Lilivres';
        addButtonText.textContent = 'Ajouter un Livre';
        totalPages.textContent = `Nombre de pages lues: ${bookManager.getTotalPages()}`;
        uiManager.updateBooksGrid();
    }
};

window.handleAddFilm = (event) => {
    event.preventDefault();
    const form = event.target;
    const editId = form.getAttribute('data-edit-id');

    const fileInput = document.getElementById('filmCoverImage');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processFilmData(e.target.result, editId);
        };
        reader.readAsDataURL(file);
    } else {
        const existingFilm = editId ? filmManager.getFilmById(parseInt(editId)) : null;
        processFilmData(existingFilm ? existingFilm.coverImage : null, editId);
    }
};

function processFilmData(coverImage, editId) {
    const filmData = {
        title: document.getElementById('filmTitle').value,
        duration: parseInt(document.getElementById('filmDuration').value),
        viewDate: document.getElementById('viewDate').value,
        rating: modalManager.getSelectedRating(),
        coverImage: coverImage
    };

    if (editId) {
        filmData.id = parseInt(editId);
        filmManager.updateFilm(filmData);
        document.getElementById('addFilmForm').removeAttribute('data-edit-id');
    } else {
        filmData.id = Date.now();
        filmManager.addFilm(filmData);
    }

    uiManager.updateFilmsGrid();
    modalManager.closeAddModal();
}

// Event Listeners
window.openAddModal = () => modalManager.openAddModal();
window.closeAddModal = () => modalManager.closeAddModal();
window.closeDetailsModal = () => modalManager.closeDetailsModal();
window.selectRating = (rating) => modalManager.selectRating(rating);

window.deleteBook = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce livre ?')) {
        bookManager.deleteBook(id);
        uiManager.updateBooksGrid();
        uiManager.updateTotalPages();
        modalManager.closeDetailsModal();
    }
};

// Fonction de changement de thème
window.changeTheme = (theme) => {
    themeManager.applyTheme(theme);
};

// Fonction d'édition
window.editBook = (id) => {
    const book = bookManager.getBookById(id);
    if (book) {
        uiManager.prepareBookEdit(book);
    }
};

// Modifier la fonction handleAddBook
window.handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target;
    const editId = form.getAttribute('data-edit-id');

    const fileInput = document.getElementById('coverImage');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processBookData(e.target.result, editId);
        };
        reader.readAsDataURL(file);
    } else {
        const existingBook = editId ? bookManager.getBookById(parseInt(editId)) : null;
        processBookData(existingBook ? existingBook.coverImage : null, editId);
    }
};

function addBookWithCover(coverImage) {
    const newBook = {
        id: Date.now(),
        title: document.getElementById('bookTitle').value,
        pages: parseInt(document.getElementById('bookPages').value),
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        rating: modalManager.getSelectedRating(),
        coverImage: coverImage
    };

    bookManager.addBook(newBook);
    uiManager.updateBooksGrid();
    uiManager.updateTotalPages();
    modalManager.closeAddModal();
}

// Fermer les modales si on clique en dehors
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
function processBookData(coverImage, editId) {
    const bookData = {
        title: document.getElementById('bookTitle').value,
        pages: parseInt(document.getElementById('bookPages').value),
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        rating: modalManager.getSelectedRating(),
        coverImage: coverImage
    };

    if (editId) {
        bookData.id = parseInt(editId);
        bookManager.updateBook(bookData);
        document.getElementById('addBookForm').removeAttribute('data-edit-id');
    } else {
        bookData.id = Date.now();
        bookManager.addBook(bookData);
    }

    uiManager.updateBooksGrid();
    uiManager.updateTotalPages();
    modalManager.closeAddModal();
}
