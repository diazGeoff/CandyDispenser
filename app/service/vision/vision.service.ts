import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Image } from "ui/image";
import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class VisionService {
    private testKey: string = 'AIzaSyA70IPOmcElTbxAm2B44CIVkzmbKM1VpyQ';
    private service_url: string = 'https://vision.googleapis.com/v1/images:annotate?key=' + this.testKey;

    constructor(private http: Http) { }

    getAnnotation(image: any): Promise<Observable<any>> {
        let self = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var requestJsonString = "";

        var requestJson = {
            requests: [
                {
                    image: {
                        content: image.toBase64String("jpeg")
                    },
                    features: [
                        {
                            type: "FACE_DETECTION",
                            maxResults: 3
                        },
                        {
                            type: "LABEL_DETECTION",
                            maxResults: 3
                        },
                        {
                            type: "LOGO_DETECTION",
                            maxResults: 2
                        },
                        {
                            type: "TEXT_DETECTION",
                            maxResults: 1
                        }
                    ]
                }
            ]
        }

        requestJsonString = JSON.stringify(requestJson);

        console.log("Before the service promise")

        return Promise.resolve(self.http.post(self.service_url, requestJsonString, { headers: headers })
            .map((resp: Response) => {
                if (!resp.ok) throw new Error("Response Error");

                return resp.json();
            })
            .catch(self.handleError)
        );
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}