import { Injectable } from '@angular/core';
// import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos: Video[] = [];

  // constructor(private mediaCapture: MediaCapture) { }
  constructor() { }

  takeVideo() {
    console.log('Video Capture clicked');

    // const options: CaptureVideoOptions = { limit: 3, duration: 10 };

    /* const captureError: CaptureError = function (error) {
      console.log('Error code: ' + error.code, null, 'Capture Error');
    };

    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );*/

    // this.mediaCapture.captureVideo();

    // const options: CaptureImageOptions = { limit: 3 };
    // this.mediaCapture.captureImage(options)
    //   .then(
    //     (data: MediaFile[]) => console.log(data),
    //     (err: CaptureError) => console.error(err)
    //   );
  }
}
class Video {
  data: any;
}
