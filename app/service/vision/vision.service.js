"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var VisionService = (function () {
    function VisionService(http) {
        this.http = http;
        this.testKey = 'AIzaSyA70IPOmcElTbxAm2B44CIVkzmbKM1VpyQ';
        this.service_url = 'https://vision.googleapis.com/v1/images:annotate?key=' + this.testKey;
    }
    VisionService.prototype.getAnnotation = function (image) {
        var self = this;
        var headers = new http_1.Headers();
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
        };
        requestJsonString = JSON.stringify(requestJson);
        console.log("Before the service promise");
        return Promise.resolve(self.http.post(self.service_url, requestJsonString, { headers: headers })
            .map(function (resp) {
            if (!resp.ok)
                throw new Error("Response Error");
            return resp.json();
        })
            .catch(self.handleError));
    };
    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    VisionService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    VisionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], VisionService);
    return VisionService;
}());
exports.VisionService = VisionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXNpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsOEJBQXFDO0FBRXJDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFHL0I7SUFJSSx1QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFIdEIsWUFBTyxHQUFXLHlDQUF5QyxDQUFDO1FBQzVELGdCQUFXLEdBQVcsdURBQXVELEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUVuRSxDQUFDO0lBRW5DLHFDQUFhLEdBQWIsVUFBYyxLQUFVO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxXQUFXLEdBQUc7WUFDZCxRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksS0FBSyxFQUFFO3dCQUNILE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztxQkFDeEM7b0JBQ0QsUUFBUSxFQUFFO3dCQUNOOzRCQUNJLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLFVBQVUsRUFBRSxDQUFDO3lCQUNoQjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixVQUFVLEVBQUUsQ0FBQzt5QkFDaEI7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsVUFBVSxFQUFFLENBQUM7eUJBQ2hCO3dCQUNEOzRCQUNJLElBQUksRUFBRSxnQkFBZ0I7NEJBQ3RCLFVBQVUsRUFBRSxDQUFDO3lCQUNoQjtxQkFDSjtpQkFDSjthQUNKO1NBQ0osQ0FBQTtRQUVELGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBRXpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDM0YsR0FBRyxDQUFDLFVBQUMsSUFBYztZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWhELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRCx5RUFBeUU7SUFDakUsbUNBQVcsR0FBbkIsVUFBb0IsS0FBcUI7UUFDckMsb0VBQW9FO1FBQ3BFLElBQUksTUFBYyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxlQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxZQUFNLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxVQUFJLEdBQUssQ0FBQztRQUNsRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBbkVRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FLaUIsV0FBSTtPQUpyQixhQUFhLENBb0V6QjtJQUFELG9CQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlzaW9uU2VydmljZSB7XG4gICAgcHJpdmF0ZSB0ZXN0S2V5OiBzdHJpbmcgPSAnQUl6YVN5QTcwSVBPbWNFbFRieEFtMkI0NENJVmt6bWJLTTFWcHlRJztcbiAgICBwcml2YXRlIHNlcnZpY2VfdXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly92aXNpb24uZ29vZ2xlYXBpcy5jb20vdjEvaW1hZ2VzOmFubm90YXRlP2tleT0nICsgdGhpcy50ZXN0S2V5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIGdldEFubm90YXRpb24oaW1hZ2U6IGFueSk6IFByb21pc2U8T2JzZXJ2YWJsZTxhbnk+PiB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgdmFyIHJlcXVlc3RKc29uU3RyaW5nID0gXCJcIjtcblxuICAgICAgICB2YXIgcmVxdWVzdEpzb24gPSB7XG4gICAgICAgICAgICByZXF1ZXN0czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGltYWdlLnRvQmFzZTY0U3RyaW5nKFwianBlZ1wiKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiRkFDRV9ERVRFQ1RJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhSZXN1bHRzOiAzXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiTEFCRUxfREVURUNUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4UmVzdWx0czogM1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkxPR09fREVURUNUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4UmVzdWx0czogMlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlRFWFRfREVURUNUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4UmVzdWx0czogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0SnNvbik7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgdGhlIHNlcnZpY2UgcHJvbWlzZVwiKVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VsZi5odHRwLnBvc3Qoc2VsZi5zZXJ2aWNlX3VybCwgcmVxdWVzdEpzb25TdHJpbmcsIHsgaGVhZGVyczogaGVhZGVycyB9KVxuICAgICAgICAgICAgLm1hcCgocmVzcDogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3Aub2spIHRocm93IG5ldyBFcnJvcihcIlJlc3BvbnNlIEVycm9yXCIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChzZWxmLmhhbmRsZUVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGZyb20gaHR0cHM6Ly9hbmd1bGFyLmlvL2RvY3MvdHMvbGF0ZXN0L2d1aWRlL3NlcnZlci1jb21tdW5pY2F0aW9uLmh0bWxcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICAvLyBJbiBhIHJlYWwgd29ybGQgYXBwLCB3ZSBtaWdodCB1c2UgYSByZW1vdGUgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZVxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJNc2cpO1xuICAgIH1cbn0iXX0=