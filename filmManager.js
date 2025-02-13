class FilmManager {
    constructor() {
        this.films = this.loadFilms();
    }

    loadFilms() {
        const savedFilms = localStorage.getItem('lilifilms-films');
        return savedFilms ? JSON.parse(savedFilms) : [];
    }

    saveFilms() {
        localStorage.setItem('lilifilms-films', JSON.stringify(this.films));
    }

    addFilm(film) {
        this.films.push(film);
        this.saveFilms();
    }

    getTotalDuration() {
        return this.films.reduce((sum, film) => sum + film.duration, 0);
    }

    getAllFilms() {
        return this.films;
    }

    getFilmById(id) {
        return this.films.find(film => film.id === id);
    }

    deleteFilm(id) {
        this.films = this.films.filter(film => film.id !== id);
        this.saveFilms();
    }

    updateFilm(updatedFilm) {
        const index = this.films.findIndex(film => film.id === updatedFilm.id);
        if (index !== -1) {
            this.films[index] = updatedFilm;
            this.saveFilms();
            return true;
        }
        return false;
    }
}
