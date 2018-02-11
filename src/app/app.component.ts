import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import { UploadService } from "./services/upload.service";
import { DownloadService } from "./services/download.service";
import { TimeService } from "./services/time.service";
import { SessionService } from "./services/session.service";
import { PlayerService } from "./services/player.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    uploadFile: File;

    secondsToStart = 0;
    existingSession = "";

    showHelp = false;

    helpButtonText = "Web App is Under Progress. Want to know, How to use?";



    constructor(private uploadService: UploadService,
        private downloadService: DownloadService,
        private timeService: TimeService,
        private sessionService: SessionService,
        private playerService: PlayerService) {
    }

    ngOnInit() {
        this.sessionService.getSession().subscribe((session) => {
            this.afterSession(session);
        });
    }

    afterSession = (session) => {
        this.timeService.setTime(10, this.sessionService.sessionId).subscribe((response) => {
            if (response) {
                this.playerService.playAt((+response[this.sessionService.sessionId].time) * 1000);
            }
        });
    }


    useExternalSession() {
        if (this.existingSession) {
            this.playerService.reset();

            this.sessionService.getSessionTime(this.existingSession).subscribe((response) => {
                if (response) {
                this.playerService.playAt((+response.time) * 1000);
                }
            });
        } else {
            console.error("Enter Session ID");
        }
    }

    setTime() {
        this.playerService.reset();

        this.timeService.setTime(this.secondsToStart, this.sessionService.sessionId).subscribe((response) => {
            if (response) {
                this.playerService.playAt((+response[this.sessionService.sessionId].time) * 1000);
            }
        });
    }






    // -------------------------------------------


    currentTab = 0;

    tabClick(id) {
        this.currentTab = id;
    }


    downloadFile(data) {
        var blob = new Blob([data], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    download() {
        this.downloadService.downloadSong();
    }
    upload() {
        if (this.uploadFile) {
            this.uploadService.uploadSong(this.uploadFile);
        }
        else {
            console.error("Choose File First");
        }
    }


    helpClick() {
        this.showHelp = !this.showHelp;
        this.helpButtonText = this.helpButtonText == "Hide Help" ? "Web App is Under Progress. Want to know, How to use?" : "Hide Help";
    }




    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.uploadFile = fileList[0];
        }
    }
}

    // FolderName :"ABCDEFGHZ"
    // ParentHash   :   "rihuvtq"
    // UploadID   :   "66855106"
    // UserID   :   44961
    // add_key   :   "50407"
    // delete_key   :   "af39cc1e"
    // hash   :   "fbs8juyh"
