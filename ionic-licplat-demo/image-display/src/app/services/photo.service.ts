import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

/* import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';*/

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor(private camera: Camera, private storage: Storage) { }

  takePicture() {
    console.log('Camera Image clicked');

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA
    };

    this.camera.getPicture(options).then((imageDATA) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageDATA
        // data: imageURI
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
    }
    );
  }
}
class Photo {
  data: any;
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
