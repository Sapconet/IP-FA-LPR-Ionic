import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
// import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  public videos: Video[] = [];

  // constructor(private camera: Camera, private storage: Storage) { }
  constructor(private camera: Camera, private storage: Storage/*, private mediaCapture: MediaCapture*/) { }

  takePicture() {
    console.log('Camera Image clicked');

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log('Camera issue: ' + err);
    });
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }

  // takeVideo() {
  //   console.log('Video Capture clicked');

  //   const options: CaptureVideoOptions = { limit: 3, duration: 10 };

  //   this.mediaCapture.captureVideo(options).then(
  //     (data: MediaFile[]) => console.log(data),
  //     (err: CaptureError) => console.error(err)
  //   );
  // }
}

class Photo {
  data: any;
}

class Video {
  data: any;
}
