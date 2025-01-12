class ModalManager {
    constructor() {
        this.selectedRating = null;
    }

    openAddModal() {
        document.getElementById('addModal').classList.add('active');
    }

    closeAddModal() {
        document.getElementById('addModal').classList.remove('active');
        document.getElementById('addBookForm').reset();
        this.resetRatingButtons();
    }

    openDetailsModal() {
        document.getElementById('detailsModal').classList.add('active');
    }

    closeDetailsModal() {
        document.getElementById('detailsModal').classList.remove('active');
    }

    selectRating(rating) {
        this.selectedRating = rating;
        document.getElementById('bookRating').value = rating;
        
        document.querySelectorAll('.rating-button').forEach(button => {
            button.classList.remove('selected');
        });
        document.querySelector(`[data-rating="${rating}"]`).classList.add('selected');
    }

    resetRatingButtons() {
        this.selectedRating = null;
        document.getElementById('bookRating').value = '';
        document.querySelectorAll('.rating-button').forEach(button => {
            button.classList.remove('selected');
        });
    }

    getSelectedRating() {
        return this.selectedRating;
    }
}
