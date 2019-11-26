import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {
  toggleMode: boolean = false;

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

    const toggle = document.querySelector('#themeToggle');

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
      // toggle.check = shouldCheck;
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
