import { Component, ViewChild } from "@angular/core";
import { Image } from "ui/image";
import imageSource = require("image-source");
import * as camera from "nativescript-camera";
import { VisionService } from "../../service/vision/vision.service";
import { BluetoothService } from "../../service/bluetooth/bluetooth.service";
import { fromAsset } from "image-source";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "cloud-vision",
    templateUrl: "pages/cloud-vision/cloud-vision.component.html",
    styleUrls: [ "pages/cloud-vision/cloud-vision-common.css" ]
})
export class CloudVisionComponent {

    image: Image;
    imageSource: string = "";
    isWaiting: boolean = false;
    candyStatus: boolean = true;
    bleUUID: string = "C8:FD:19:9C:A6:CE";

    constructor(private _visionService: VisionService, private _bluetoothService: BluetoothService) {
        this.image = new Image();
        camera.requestPermissions();
        _bluetoothService.connectToBluetooth(this.bleUUID)
            .then(() => {
                dialogs.alert("Successfully connected to bluetooth");
            }).catch(err => {
                dialogs.alert("There's an error connecting to bluetooth");
            });
    }

    capturePicture() {
        var _self = this;
        this.candyStatus = true;
        this.imageSource = "";

        camera.takePicture({
            saveToGallery: false
        }).then(imageCaptured => {
            this.isWaiting = true;

            imageSource.fromAsset(imageCaptured).then(image => {
                _self.imageSource = "data:image/jpeg;base64," + image.toBase64String("jpeg");

                this._visionService.getAnnotation(image)
                    .then(observable => {
                        console.log("success");
                        observable.subscribe(
                            (success) => {
                                _self.isWaiting = false;
                                let faceAnnotations = success.responses[0].faceAnnotations[0];

                                if (!faceAnnotations) return _self.candyStatus = false;

                                _self.candyStatus = _self.checkIfSmiling(faceAnnotations.joyLikelihood);
                                if (_self.candyStatus) {
                                    dialogs.alert("Enjoy your candy !!!");
                                    _self._bluetoothService.sendMessageToBleDevice(_self.bleUUID, "1");
                                } else {
                                    dialogs.alert("No candy for you T.T");
                                }
                            },
                            (error) => console.dir(error)
                        );
                    });
            });
        }).catch(error => {
            console.dir(error);
        });
    }

    checkIfSmiling(status: string) {
        let acceptedStatus = [
            "VERY_LIKELY",
            "LIKELY"
        ];

        return (acceptedStatus.indexOf(status) != -1);
    }

}