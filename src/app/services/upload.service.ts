import { Injectable } from "@angular/core"
import { RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class UploadService {
    apiEndPoint = "http://syncsong.zencess.com/upload.php";
    
    constructor(private http: Http) {

    }

    uploadSong(file: File) {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => console.log('data', data),
            error => console.log(error)
            )

    }
}