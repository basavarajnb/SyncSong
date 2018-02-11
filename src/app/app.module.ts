import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UploadService } from "./services/upload.service";
import { DownloadService } from "./services/download.service";
import { TimeService } from "./services/time.service";
import { FormsModule } from '@angular/forms';
import { SessionService } from "./services/session.service";

// Controls
import {MdProgressSpinnerModule} from '@angular/material';
import { PlayerComponent } from "./components/player/player.component";
import { PlayerService } from "./services/player.service";
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MdProgressSpinnerModule
  ],
  providers: [SessionService, DownloadService, UploadService, TimeService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
