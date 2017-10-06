"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_1 = require("ui/image");
var imageSource = require("image-source");
var camera = require("nativescript-camera");
var vision_service_1 = require("../../service/vision/vision.service");
var bluetooth_service_1 = require("../../service/bluetooth/bluetooth.service");
var dialogs = require("ui/dialogs");
var CloudVisionComponent = (function () {
    function CloudVisionComponent(_visionService, _bluetoothService) {
        this._visionService = _visionService;
        this._bluetoothService = _bluetoothService;
        this.imageSource = "";
        this.isWaiting = false;
        this.candyStatus = true;
        this.bleUUID = "C8:FD:19:9C:A6:CE";
        this.image = new image_1.Image();
        camera.requestPermissions();
        _bluetoothService.connectToBluetooth(this.bleUUID)
            .then(function () {
            dialogs.alert("Successfully connected to bluetooth");
        }).catch(function (err) {
            dialogs.alert("There's an error connecting to bluetooth");
        });
    }
    CloudVisionComponent.prototype.capturePicture = function () {
        var _this = this;
        var _self = this;
        this.candyStatus = true;
        this.imageSource = "";
        camera.takePicture({
            saveToGallery: false
        }).then(function (imageCaptured) {
            _this.isWaiting = true;
            imageSource.fromAsset(imageCaptured).then(function (image) {
                _self.imageSource = "data:image/jpeg;base64," + image.toBase64String("jpeg");
                _this._visionService.getAnnotation(image)
                    .then(function (observable) {
                    console.log("success");
                    observable.subscribe(function (success) {
                        _self.isWaiting = false;
                        var faceAnnotations = success.responses[0].faceAnnotations[0];
                        if (!faceAnnotations)
                            return _self.candyStatus = false;
                        _self.candyStatus = _self.checkIfSmiling(faceAnnotations.joyLikelihood);
                        if (_self.candyStatus) {
                            dialogs.alert("Enjoy your candy !!!");
                            _self._bluetoothService.sendMessageToBleDevice(_self.bleUUID, "1");
                        }
                        else {
                            dialogs.alert("No candy for you T.T");
                        }
                    }, function (error) { return console.dir(error); });
                });
            });
        }).catch(function (error) {
            console.dir(error);
        });
    };
    CloudVisionComponent.prototype.checkIfSmiling = function (status) {
        var acceptedStatus = [
            "VERY_LIKELY",
            "LIKELY"
        ];
        return (acceptedStatus.indexOf(status) != -1);
    };
    CloudVisionComponent = __decorate([
        core_1.Component({
            selector: "cloud-vision",
            templateUrl: "pages/cloud-vision/cloud-vision.component.html",
            styleUrls: ["pages/cloud-vision/cloud-vision-common.css"]
        }),
        __metadata("design:paramtypes", [vision_service_1.VisionService, bluetooth_service_1.BluetoothService])
    ], CloudVisionComponent);
    return CloudVisionComponent;
}());
exports.CloudVisionComponent = CloudVisionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdmlzaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsb3VkLXZpc2lvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUQ7QUFDckQsa0NBQWlDO0FBQ2pDLDBDQUE2QztBQUM3Qyw0Q0FBOEM7QUFDOUMsc0VBQW9FO0FBQ3BFLCtFQUE2RTtBQUU3RSxvQ0FBc0M7QUFPdEM7SUFRSSw4QkFBb0IsY0FBNkIsRUFBVSxpQkFBbUM7UUFBMUUsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBTDlGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsWUFBTyxHQUFXLG1CQUFtQixDQUFDO1FBR2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzdDLElBQUksQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDZDQUFjLEdBQWQ7UUFBQSxpQkFzQ0M7UUFyQ0csSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDZixhQUFhLEVBQUUsS0FBSztTQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsYUFBYTtZQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7Z0JBQzNDLEtBQUssQ0FBQyxXQUFXLEdBQUcseUJBQXlCLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFN0UsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO3FCQUNuQyxJQUFJLENBQUMsVUFBQSxVQUFVO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZCLFVBQVUsQ0FBQyxTQUFTLENBQ2hCLFVBQUMsT0FBTzt3QkFDSixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzt3QkFDeEIsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRTlELEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFFdkQsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDeEUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs0QkFDdEMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZFLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDO29CQUNMLENBQUMsRUFDRCxVQUFDLEtBQUssSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQ2hDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZSxNQUFjO1FBQ3pCLElBQUksY0FBYyxHQUFHO1lBQ2pCLGFBQWE7WUFDYixRQUFRO1NBQ1gsQ0FBQztRQUVGLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBbEVRLG9CQUFvQjtRQUxoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxTQUFTLEVBQUUsQ0FBRSw0Q0FBNEMsQ0FBRTtTQUM5RCxDQUFDO3lDQVNzQyw4QkFBYSxFQUE2QixvQ0FBZ0I7T0FSckYsb0JBQW9CLENBb0VoQztJQUFELDJCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCBpbWFnZVNvdXJjZSA9IHJlcXVpcmUoXCJpbWFnZS1zb3VyY2VcIik7XG5pbXBvcnQgKiBhcyBjYW1lcmEgZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcbmltcG9ydCB7IFZpc2lvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS92aXNpb24vdmlzaW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEJsdWV0b290aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9ibHVldG9vdGgvYmx1ZXRvb3RoLnNlcnZpY2VcIjtcbmltcG9ydCB7IGZyb21Bc3NldCB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiY2xvdWQtdmlzaW9uXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvY2xvdWQtdmlzaW9uL2Nsb3VkLXZpc2lvbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyBcInBhZ2VzL2Nsb3VkLXZpc2lvbi9jbG91ZC12aXNpb24tY29tbW9uLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2xvdWRWaXNpb25Db21wb25lbnQge1xuXG4gICAgaW1hZ2U6IEltYWdlO1xuICAgIGltYWdlU291cmNlOiBzdHJpbmcgPSBcIlwiO1xuICAgIGlzV2FpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGNhbmR5U3RhdHVzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBibGVVVUlEOiBzdHJpbmcgPSBcIkM4OkZEOjE5OjlDOkE2OkNFXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aXNpb25TZXJ2aWNlOiBWaXNpb25TZXJ2aWNlLCBwcml2YXRlIF9ibHVldG9vdGhTZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgY2FtZXJhLnJlcXVlc3RQZXJtaXNzaW9ucygpO1xuICAgICAgICBfYmx1ZXRvb3RoU2VydmljZS5jb25uZWN0VG9CbHVldG9vdGgodGhpcy5ibGVVVUlEKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGJsdWV0b290aFwiKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIlRoZXJlJ3MgYW4gZXJyb3IgY29ubmVjdGluZyB0byBibHVldG9vdGhcIik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXB0dXJlUGljdHVyZSgpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jYW5keVN0YXR1cyA9IHRydWU7XG4gICAgICAgIHRoaXMuaW1hZ2VTb3VyY2UgPSBcIlwiO1xuXG4gICAgICAgIGNhbWVyYS50YWtlUGljdHVyZSh7XG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiBmYWxzZVxuICAgICAgICB9KS50aGVuKGltYWdlQ2FwdHVyZWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1dhaXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBpbWFnZVNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VDYXB0dXJlZCkudGhlbihpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgX3NlbGYuaW1hZ2VTb3VyY2UgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZS50b0Jhc2U2NFN0cmluZyhcImpwZWdcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpb25TZXJ2aWNlLmdldEFubm90YXRpb24oaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKG9ic2VydmFibGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuaXNXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYWNlQW5ub3RhdGlvbnMgPSBzdWNjZXNzLnJlc3BvbnNlc1swXS5mYWNlQW5ub3RhdGlvbnNbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmYWNlQW5ub3RhdGlvbnMpIHJldHVybiBfc2VsZi5jYW5keVN0YXR1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmNhbmR5U3RhdHVzID0gX3NlbGYuY2hlY2tJZlNtaWxpbmcoZmFjZUFubm90YXRpb25zLmpveUxpa2VsaWhvb2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3NlbGYuY2FuZHlTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJFbmpveSB5b3VyIGNhbmR5ICEhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLl9ibHVldG9vdGhTZXJ2aWNlLnNlbmRNZXNzYWdlVG9CbGVEZXZpY2UoX3NlbGYuYmxlVVVJRCwgXCIxXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIk5vIGNhbmR5IGZvciB5b3UgVC5UXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUuZGlyKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0lmU21pbGluZyhzdGF0dXM6IHN0cmluZykge1xuICAgICAgICBsZXQgYWNjZXB0ZWRTdGF0dXMgPSBbXG4gICAgICAgICAgICBcIlZFUllfTElLRUxZXCIsXG4gICAgICAgICAgICBcIkxJS0VMWVwiXG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIChhY2NlcHRlZFN0YXR1cy5pbmRleE9mKHN0YXR1cykgIT0gLTEpO1xuICAgIH1cblxufSJdfQ==