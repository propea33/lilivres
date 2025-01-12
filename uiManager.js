// uiManager.js
class UIManager {
    constructor(bookManager) {
        this.bookManager = bookManager;
        // Initialiser l'affichage au démarrage
        this.initializeDisplay();
    }

    // Nouvelle méthode pour initialiser l'affichage
    initializeDisplay() {
        this.updateBooksGrid();
        this.updateTotalPages();
    }

    updateBooksGrid() {
        const grid = document.getElementById('booksGrid');
        grid.innerHTML = '';

        this.bookManager.getAllBooks().forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.onclick = () => this.showBookDetails(book);

            const cover = document.createElement('div');
            cover.className = 'book-cover';
            if (book.coverImage) {
                const img = document.createElement('img');
                img.src = book.coverImage;
                img.alt = book.title;
                cover.appendChild(img);
            }

            const title = document.createElement('div');
            title.className = 'book-title';
            title.textContent = book.title;

            card.appendChild(cover);
            card.appendChild(title);
            grid.appendChild(card);
        });
    }

    updateTotalPages() {
        const total = this.bookManager.getTotalPages();
        document.getElementById('totalPages').textContent = `Nombre de pages lues: ${total}`;
    }

   showBookDetails(book) {
    const details = document.getElementById('bookDetails');
    const getRatingEmoji = rating => {
        const emojis = { unhappy: '😠', neutral: '😐', happy: '😊' };
        return emojis[rating] || '';
    };

    details.innerHTML = `
        <h2>${book.title}</h2>
        <div class="book-details">
            <div>
                ${book.coverImage ? `<img src="${book.coverImage}" alt="${book.title}" style="width: 100%; border-radius: 0.5rem;">` : ''}
            </div>
            <div>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Début:</strong> ${book.startDate}</p>
                <p><strong>Fin:</strong> ${book.endDate}</p>
                <p><strong>Critique:</strong> ${getRatingEmoji(book.rating)}</p>
                <button class="edit-button" onclick="editBook(${book.id})">Modifier le livre</button>
                <button class="delete-button" onclick="deleteBook(${book.id})">Supprimer le livre</button>
            </div>
        </div>
    `;

    modalManager.openDetailsModal();
}

prepareBookEdit(book) {
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('startDate').value = book.startDate;
    document.getElementById('endDate').value = book.endDate;
    modalManager.selectRating(book.rating);
    
    const form = document.getElementById('addBookForm');
    form.setAttribute('data-edit-id', book.id);
    
    modalManager.closeDetailsModal();
    modalManager.openAddModal();
}
}
