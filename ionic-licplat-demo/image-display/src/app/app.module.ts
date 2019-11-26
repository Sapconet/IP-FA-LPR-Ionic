import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { MediaCapture } from '@ionic-native/media-capture';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { OpenALPR } from '@ionic-native/openalpr/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AlertController } from '@ionic/angular';

import { ImgCardComponent } from './img-card/img-card.component';

@NgModule({
  declarations: [AppComponent, ImgCardComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    WebView,
    FilePath,
    AlertController,
    CameraPreview,
    OpenALPR,
    BarcodeScanner,
    // MediaCapture,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
