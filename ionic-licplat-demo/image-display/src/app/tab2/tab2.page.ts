import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { PhotoService } from '../services/photo.service';
import { VideoService } from '../services/video.service';
import { AppSettingsPage } from '../app-settings/app-settings.page';

// import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  currentImage: any;
  // private mediaCapture: MediaCapture;
  booleanValue: boolean = true;
  selectedPhoto: any;
  isAtBottom: boolean = false;

  constructor(
    public photoService: PhotoService,
    public videoService: VideoService,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.photoService.loadSaved();
    // this.toggleDev = this.appSettingsPage.toggleDev;
    console.log('Loading images...');
  }

  onSelect(photo) {
    this.selectedPhoto = photo;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  switchInput(event) {
    this.booleanValue = !this.booleanValue;

    if (this.booleanValue === true) {
      this.presentToast('Input switched to Still Images');
    } else {
      this.presentToast('Input switched to Video Capturing');
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

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: 'About this page:',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  imgIconClick(event) {
    this.presentAlert('This page allows you to capture images/videos for training');
  }

  ProduceToKafka(photo: Photo) {
    this.photoService.ProduceToKafka(photo).subscribe(
      photo => {
        console.log(photo);
      }
    );
  }


}

class Photo {
  data: any;
  date: Date;
};
