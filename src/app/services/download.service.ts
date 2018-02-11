import { Injectable } from "@angular/core"
import { RequestOptions, Http, Headers, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
@Injectable()
export class DownloadService {
    downloadUrl = "http://syncsong.zencess.com/download.php";

    constructor(private http: Http) {

    }

    downloadSong() {
        // Depending on what you are sending to the server
        // and what the server is sending back
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        });


        let options = new RequestOptions({ headers: headers });
        // Ensure you set the responseType to Blob.
        options.responseType = ResponseContentType.Blob;
        this.http.post(this.downloadUrl, {}, options)
            .map((response) => {
                // Removed checking of valid response

                let fileBlob = response.blob();
                let blob = new Blob([fileBlob], {
                    type: response.headers.get('content-type')// 'application/pdf' // must match the Accept type
                });
                this.saveFile(blob);
                console.log("Result", blob);
                return response;
            })
            .subscribe((response) => {
                console.log(response);
            });

    }

    saveFile(blob) {

        //   this.downloadFile(data);
        // Removed checking of valid response
        // let fileBlob = response;
        // let blob = new Blob([fileBlob], {
        //     type: 'application/pdf' // must match the Accept type
        // });

        let filename = 'mysong123.mp3';
        FileSaver.saveAs(blob, filename);


        // FileSaver.saveAs(data, "new2.pdf");        
    }
}