import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  hideStart: boolean = true;
  hideStop: boolean = false;

  constructor(private cameraPreview: CameraPreview) { }

  ngOnInit() {
  }

  startLivePreview() {
    const CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false,
      storeToFile: false,
      disableExifHeaderStripping: false
    };

    this.cameraPreview.startCamera(CameraPreviewOptions);

    this.hideStart = !this.hideStart;
    this.hideStop = !this.hideStop;
  }

  stopLivePreview() {
    this.hideStart = !this.hideStart;
    this.hideStop = !this.hideStop;
  }
}
