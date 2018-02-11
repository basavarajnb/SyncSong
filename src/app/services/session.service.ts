import { Injectable } from "@angular/core"
import { RequestOptions, Http, Headers, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
@Injectable()
export class SessionService {
    sessionUrl = "http://syncsong.zencess.com/getSession.php";
    sessionTimeUrl = "http://syncsong.zencess.com/getSessionTime.php";

    sessionId: string = "";

    constructor(private http: Http) {
    }

    getSession() {
        let session = localStorage.getItem("session");
        if (session) {
            this.sessionId = session;
            return Observable.of(session);
        } else {
            return this.http.get(this.sessionUrl)
                .map((response) => {
                    let session = response.json();
                    this.sessionId = session;
                    localStorage.setItem("session", session);
                    return session;
                })
        }
    }

    getSessionTime(session) {
        return this.http.get(this.sessionTimeUrl + "?session=" + session)
            .map(response => response.json())
    }
    afterSession() {
        return Observable.of("");
    }
}