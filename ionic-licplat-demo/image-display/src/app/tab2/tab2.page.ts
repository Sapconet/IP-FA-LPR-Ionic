import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { PhotoService } from '../services/photo.service';
import { VideoService } from '../services/video.service';

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

  constructor(public photoService: PhotoService, public videoService: VideoService, public toastController: ToastController) { }

  ngOnInit() {
    this.photoService.loadSaved();
    console.log('Loading images...');
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
}
