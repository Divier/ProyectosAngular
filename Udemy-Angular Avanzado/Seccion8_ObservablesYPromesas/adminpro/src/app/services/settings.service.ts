import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || '';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach( element => {
      element.classList.remove('working');
      const theme = element.getAttribute('data-theme');
      const themeUrl = `./assets/css/colors/${theme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(currentTheme === themeUrl) {
        element.classList.add('working');
      }
    })
  }

}
