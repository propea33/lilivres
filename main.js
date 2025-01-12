// main.js
const bookManager = new BookManager();
const modalManager = new ModalManager();
const uiManager = new UIManager(bookManager);

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

window.handleAddBook = (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('coverImage');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addBookWithCover(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        addBookWithCover(null);
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
