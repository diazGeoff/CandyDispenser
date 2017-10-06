import { Injectable } from "@angular/core";
import bluetooth = require("nativescript-bluetooth");


@Injectable()
export class BluetoothService {
    DEFAULT_SERVICE_UUID: string = "FFE0";
    DEFAULT_CHARACTERISTIC_UUID: string = "FFE1";

    constructor() {
        this.getCentralDevicePermission().then(granted => {

        });
    }

    getCentralDevicePermission(): Promise<boolean> {
        return bluetooth.hasCoarseLocationPermission()
            .then((granted) => {
                console.log("Has location permission ? " + granted);

                if (!granted) {
                    bluetooth.requestCoarseLocationPermission().then(() => console.log("Location permission requested"));
                }

                return granted;
            });
    }

    connectToBluetooth(UUID: string) {
        return new Promise((resolve, reject) => {
            bluetooth.connect({
                UUID: UUID,
                onConnected: function (peripheral) {
                    console.log("PERIPHERAL CONNECTED!");
                    console.log(JSON.stringify(peripheral));
                    resolve();
                },
                onDisconnected: function (peripheral) {
                    reject();
                    console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
                }
            });
        })
    }

    sendMessageToBleDevice(UUID: string, message: string) {
        var self = this;

        bluetooth.writeWithoutResponse({
            peripheralUUID: UUID,
            serviceUUID: self.DEFAULT_SERVICE_UUID,
            characteristicUUID: self.DEFAULT_CHARACTERISTIC_UUID,
            value: self.stringToBluetoothHexString(message) // a hex
        }).then(function (result) {
            console.log("value written", message);
        }, function (err) {
            console.log("write error: " + err);
        });
    }

    stringToBluetoothHexString(str: string): string {
        var bluetoothHexString: string = "";
        for (var i = 0; i < str.length; i++) {
            bluetoothHexString += `0x${str.charCodeAt(i).toString(16)}`;

            if (i < (str.length - 1)) {
                bluetoothHexString += ",";
            }
        }

        console.log("BLUETOOTH HEX STRING: ", bluetoothHexString);
        return bluetoothHexString;
    }
}