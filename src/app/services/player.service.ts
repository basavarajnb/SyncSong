import { Injectable } from "@angular/core"
import { RequestOptions, Http, Headers, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Injectable()
export class PlayerService {
    canPlayAudio: any;
    sessionUrl = "http://syncsong.zencess.com/getSession.php";
    sessionTimeUrl = "http://syncsong.zencess.com/getSessionTime.php";

    playSubj = new BehaviorSubject<boolean>(false);
    resetPlayerSubj = new BehaviorSubject<boolean>(false);


    localDateString;
    remoteDateString;
    localTimeNow;
    clearInt;
    clearTimeoutVar;

    constructor(private http: Http) {
    }


    pause() {
    }
    play = () => {
        this.playSubj.next(true);
    }
    reset() {
        this.resetPlayerSubj.next(true);
        clearInterval(this.clearInt);
        clearTimeout(this.clearTimeoutVar);
    }


    playAt(playTime) {
        let d = new Date();
        let localTime = d.getTime();

        this.localDateString = new Date(localTime);
        this.remoteDateString = new Date(playTime);


        console.log("Locale Time ", localTime);
        console.log("Remote Time ", playTime);
        console.log("Locale Time ", this.localDateString);
        console.log("Remote Time ", this.remoteDateString);
        console.log("Difference ", localTime - (+playTime));

        if (this.clearInt) {
            clearInterval(this.clearInt);
        }
        if (this.clearTimeoutVar) {
            clearTimeout(this.clearTimeoutVar);
        }

        this.clearInt = setInterval(this.myTimer, 1000);
        this.clearTimeoutVar = setTimeout(this.play, (+playTime) - localTime);
    }

    myTimer = () => {
        var d = new Date();
        this.localTimeNow = Math.floor((this.remoteDateString.getTime() / 1000) - (d.getTime() / 1000));
        if (this.localTimeNow <= 0) {
            clearInterval(this.clearInt);
        }
    }

}