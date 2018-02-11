import { Injectable } from "@angular/core"
import { RequestOptions, Http, Headers, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
@Injectable()
export class TimeService {
    timeUrl = "http://syncsong.zencess.com/getTime.php";
    setTimeUrl = "http://syncsong.zencess.com/setTime.php";

    constructor(private http: Http) {

    }

    // getTime() {
    //     return this.http.get(this.timeUrl)
    //         .map(response => response.json())
    // }
    setTime(secondsToStart, session) {        
        return this.http.get(this.setTimeUrl + "?secondsToStart='" + secondsToStart + "'&session=" + session)
            .map(response => response.json())
    }
}