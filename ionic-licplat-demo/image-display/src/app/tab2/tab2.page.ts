import { Component, OnInit } from "@angular/core";
import { PhotoService } from "../services/photo.service";

import { VideoService } from '../services/video.service';

// import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})

export class Tab2Page implements OnInit {
  currentImage: any;
  // private mediaCapture: MediaCapture;

  constructor(public photoService: PhotoService/*, public videoService: VideoService*/) { }

  ngOnInit() {
    this.photoService.loadSaved();
    console.log("Loading images...");
  }
}
