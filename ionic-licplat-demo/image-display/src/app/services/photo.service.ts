import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionSheetController, ToastController, Platform, LoadingController, AlertController, } from '@ionic/angular';

import { OpenALPR, OpenALPROptions, OpenALPRResult } from '@ionic-native/openalpr/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { File, FileEntry } from '@ionic-native/File/ngx';
/* 
import { FilePath } from '@ionic-native/file-path/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';


import { finalize } from 'rxjs/operators';*/

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor(
    private camera: Camera,
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController,
    private openALPR: OpenALPR,
    private barcodeScanner: BarcodeScanner) { }

  takePicture() {
    console.log('Camera Image clicked');

    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageDATA) => {

      // let filename = imageURI.substring(imageURI.lastIndexOf('/') + 1);
      // let path = imageURI.substring(0, imageURI.lastIndexOf('/') + 1);

      // this.File.readAsDataURL(path, filename).then(res => var_image = res);

      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageDATA,
        date: new Date()
      });

      // Add new photo to gallery
      /* this.photos.unshift({
        data: this.File.readAsDataURL(path, filename)
      });*/

      this.ProduceToKafka(imageDATA);

      // Save all photos for later viewing
      this.storage.set('photos', this.photos);

      // Using OpenLP plugin - for testing only
      /*  const scanOptions: OpenALPROptions = {
         country: this.openALPR.Country.EU,
         amount: 3
       }
 
       this.openALPR.scan(imageDATA, scanOptions)
         .then((res: [OpenALPRResult]) => {
           console.log(res);
           this.presentToast(res);
         })
         .catch((error: Error) => console.error(error));*/


    }, (err) => {
      // Handle error
      console.log('Camera issue: ' + err);
    });
  }

  scanCode() {
    // merely for testing 
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.presentToast(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  giveImgInfo(imgSrc) {
    this.presentToast(imgSrc);
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    }
    );
  }

  async clearAll() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Areyou sure you wish to <strong>delete all stored photos</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            console.log("Clearing storage");
            this.storage.clear();
          }
        }
      ]
    });

    await alert.present();
  }

  // clearAll() {
  //   console.log("Clearing storage");
  //   this.storage.clear();
  // }

  ProduceToKafka(photo: Photo) {
    console.log("Producing to Kafka");
    // console.log(photo);

    const api_url = 'http://localhost:5000/send-img';

    const sendPhoto = JSON.parse('{ "photo": "A base64 image" }');
    // const sendPhoto = JSON.parse('{ "photo": ' + photo + ' }');
    // console.log(sendPhoto);

    const HttpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    this.http.post(api_url, sendPhoto, HttpOptions).subscribe(
      val => {
        console.log("post call successful value returned in body", val);
        this.presentToast("Well, hello sailor!");
      },
      response => {
        console.log("post call in error", response);
        this.presentToast(JSON.stringify(response.error.text));

      },
      () => {
        console.log("The post observable is now completed.");
      }
    );
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
class Photo {
  data: any;
  date: Date;
}

// export class PhotoService {
//   // public photos: Photo[] = [];
//   photos = [];

//   constructor(private camera: Camera, private storage: Storage, private file: File, private http: HttpClient,
//     private webview: WebView, private actionSheetController: ActionSheetController, private toastController: ToastController,
//     private plt: Platform, private loadingController: LoadingController, private ref: ChangeDetectorRef, private filePath: FilePath) { }

//   async selectImage() {
//     console.log('Select image button clicked...');
//     const actionSheet = await this.actionSheetController.create({
//       header: 'Select Image source',
//       buttons: [{
//         text: 'Load from Library',
//         handler: () => {
//           this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
//         }
//       },
//       {
//         text: 'Use Camera',
//         handler: () => {
//           this.takePicture(this.camera.PictureSourceType.CAMERA);
//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel'
//       }
//       ]
//     });
//     await actionSheet.present();
//   }

//   takePicture(sourceType: PictureSourceType) {
//     console.log('Camera Image clicked');

//     const options: CameraOptions = {
//       quality: 100,
//       sourceType: sourceType,
//       /* destinationType: this.camera.DestinationType.FILE_URI,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE*/
//       saveToPhotoAlbum: false,
//       correctOrientation: true
//     };

//     this.camera.getPicture(options).then((imagePath) => {/*
//       // Add new photo to gallery
//       this.photos.unshift({
//         // data: 'data:image/jpeg;base64,' + imageDATA
//         data: imageURI
//       });

//       // Save all photos for later viewing
//       this.storage.set('photos', this.photos);
//     }, (err) => {
//       // Handle error
//       console.log('Camera issue: ' + err);
//     });*/

//       if (/*this.plt.is('android') && sourceType === */this.camera.PictureSourceType.PHOTOLIBRARY) {
//         this.filePath.resolveNativePath(imagePath)
//           .then(filePath => {
//             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
//             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//           });
//       } else {
//         var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//         var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//       }
//     });
//   }

//   loadSaved() {
//     this.storage.get('photos').then((photos) => {
//       if (photos) {
//         let arr = JSON.parse(photos);
//         this.photos = photos || [];
//         for (let img of arr) {
//           let filePath = this.file.dataDirectory + img;
//           let resPath = this.pathForImage(filePath);
//           this.photos.push({ name: img, path: resPath, filePath: filePath });
//         }
//       }
//     });
//   }

//   pathForImage(img) {
//     if (img === null) {
//       return '';
//     } else {
//       let converted = this.webview.convertFileSrc(img);
//       return converted;
//     }
//   }

//   createFileName() {
//     var d = new Date(),
//       n = d.getTime(),
//       newFileName = n + '.jpg';
//     return newFileName;
//   }

//   copyFileToLocalDir(namePath, currentName, newFileName) {
//     this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
//       this.updateStoredImages(newFileName);
//     }, error => {
//       this.presentToast('Error while storing file.');
//     });
//   }

//   updateStoredImages(name) {
//     this.storage.get('photos').then(photos => {
//       let arr = JSON.parse(photos);
//       if (!arr) {
//         let newImages = [name];
//         this.storage.set('photos', JSON.stringify(newImages));
//       } else {
//         arr.push(name);
//         this.storage.set('photos', JSON.stringify(arr));
//       }

//       let filePath = this.file.dataDirectory + name;
//       let resPath = this.pathForImage(filePath);

//       let newEntry = {
//         name: name,
//         path: resPath,
//         filePath: filePath
//       };

//       this.photos = [newEntry, ...this.photos];
//       this.ref.detectChanges(); // trigger change detection cycle
//     });
//   }

//   deleteImage(imgEntry, position) {
//     this.photos.splice(position, 1);

//     this.storage.get('photos').then(photos => {
//       let arr = JSON.parse(photos);
//       let filtered = arr.filter(name => name != imgEntry.name);
//       this.storage.set('photos', JSON.stringify(filtered));

//       var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

//       this.file.removeFile(correctPath, imgEntry.name).then(res => {
//         this.presentToast('File removed.');
//       });
//     });
//   }

//   startUpload(imgEntry) {
//     this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
//       .then(entry => {
//         (<FileEntry>entry).file(file => this.readFile(file))
//       })
//       .catch(err => {
//         this.presentToast('Error while reading file.');
//       });
//   }

//   readFile(file: any) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const formData = new FormData();
//       const imgBlob = new Blob([reader.result], {
//         type: file.type
//       });
//       formData.append('file', imgBlob, file.name);
//       this.uploadImageData(formData);
//     };
//     reader.readAsArrayBuffer(file);
//   }

//   async uploadImageData(formData: FormData) {
//     const loading = await this.loadingController.create({
//       message: 'Uploading image...',
//     });
//     await loading.present();

//     this.http.post('http://localhost:8888/upload.php', formData)
//       .pipe(
//         finalize(() => {
//           loading.dismiss();
//         })
//       )
//       .subscribe(res => {
//         if (res['success']) {
//           this.presentToast('File upload complete.')
//         } else {
//           this.presentToast('File upload failed.')
//         }
//       });
//   }

//   async presentToast(text) {
//     const toast = await this.toastController.create({
//       message: text,
//       position: 'bottom',
//       duration: 3000
//     });
//     toast.present();
//   }
// }
