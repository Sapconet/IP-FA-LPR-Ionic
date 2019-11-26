import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  hideStart: boolean = true;

  constructor(private cameraPreview: CameraPreview, private platform: Platform) { }

  ngOnInit() {
  }

  startLivePreview() {
    console.log('Starting Preview...');

    const cameraPreviewOptions: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width - 50,
      height: window.screen.height - 50,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      toBack: true,
      tapPhoto: false,
      tapToFocus: false,
      previewDrag: false,
      disableExifHeaderStripping: false
    };

    this.platform.ready().then(() => {
      this.cameraPreview.startCamera(cameraPreviewOptions).then((info) => {
        alert(info);
      }).catch((err) => {
        alert(err);
      });
    });

    this.hideStart = !this.hideStart;
  }

  stopLivePreview() {

    console.log('Stopping Preview...');

    this.hideStart = !this.hideStart;

    this.cameraPreview.stopCamera();
  }
}
