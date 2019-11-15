import { Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos: Video[] = [];

  constructor(private mediaCapture: MediaCapture) { }

  takeVideo() {
    console.log('Video Capture clicked');

    const options: CaptureVideoOptions = { limit: 3, duration: 10 };
    
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => console.log(data),
      (err: CaptureError) => console.error(err)
    );
  }
}
class Video {
  data: any;
}
