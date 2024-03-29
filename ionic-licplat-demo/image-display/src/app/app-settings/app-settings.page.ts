import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {
  toggleMode: boolean = false;
  toggleDev: boolean = false;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  activateDarkMode(event) {
    console.log('Dark Mode Toggled');

    this.toggleMode = !this.toggleMode;
    if (this.toggleMode === true) {
      this.presentToast('Dark Mode is on')
    } else {
      this.presentToast('Dark Mode is off')
    }

    const toggle: HTMLInputElement = document.querySelector('#themeToggle');

    document.body.classList.toggle('dark', event.detail.checked);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((e) => checkToggle(e.matches));

    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      toggle.checked = shouldCheck;
    }
  }

  enableDeleteButton(event) {
    console.log('Dev Mode Toggled');

    this.toggleDev = !this.toggleDev;
    if (this.toggleDev === true) {
      this.presentToast('Dev Mode is on')
    } else {
      this.presentToast('Dev Mode is off')
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
