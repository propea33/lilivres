class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('lilivres-theme') || 'white';
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('lilivres-theme', theme);
        this.currentTheme = theme;
    }
}
