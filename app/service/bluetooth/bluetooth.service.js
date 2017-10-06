"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bluetooth = require("nativescript-bluetooth");
var BluetoothService = (function () {
    function BluetoothService() {
        this.DEFAULT_SERVICE_UUID = "FFE0";
        this.DEFAULT_CHARACTERISTIC_UUID = "FFE1";
        this.getCentralDevicePermission().then(function (granted) {
        });
    }
    BluetoothService.prototype.getCentralDevicePermission = function () {
        return bluetooth.hasCoarseLocationPermission()
            .then(function (granted) {
            console.log("Has location permission ? " + granted);
            if (!granted) {
                bluetooth.requestCoarseLocationPermission().then(function () { return console.log("Location permission requested"); });
            }
            return granted;
        });
    };
    BluetoothService.prototype.connectToBluetooth = function (UUID) {
        return new Promise(function (resolve, reject) {
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
        });
    };
    BluetoothService.prototype.sendMessageToBleDevice = function (UUID, message) {
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
    };
    BluetoothService.prototype.stringToBluetoothHexString = function (str) {
        var bluetoothHexString = "";
        for (var i = 0; i < str.length; i++) {
            bluetoothHexString += "0x" + str.charCodeAt(i).toString(16);
            if (i < (str.length - 1)) {
                bluetoothHexString += ",";
            }
        }
        console.log("BLUETOOTH HEX STRING: ", bluetoothHexString);
        return bluetoothHexString;
    };
    BluetoothService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BluetoothService);
    return BluetoothService;
}());
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxrREFBcUQ7QUFJckQ7SUFJSTtRQUhBLHlCQUFvQixHQUFXLE1BQU0sQ0FBQztRQUN0QyxnQ0FBMkIsR0FBVyxNQUFNLENBQUM7UUFHekMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztRQUU5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxREFBMEIsR0FBMUI7UUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFO2FBQ3pDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1lBQ3pHLENBQUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixJQUFZO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLFVBQVUsVUFBVTtvQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxjQUFjLEVBQUUsVUFBVSxVQUFVO29CQUNoQyxNQUFNLEVBQUUsQ0FBQztvQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekUsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGlEQUFzQixHQUF0QixVQUF1QixJQUFZLEVBQUUsT0FBZTtRQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQzNCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQ3RDLGtCQUFrQixFQUFFLElBQUksQ0FBQywyQkFBMkI7WUFDcEQsS0FBSyxFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRO1NBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUMsRUFBRSxVQUFVLEdBQUc7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxREFBMEIsR0FBMUIsVUFBMkIsR0FBVztRQUNsQyxJQUFJLGtCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNsQyxrQkFBa0IsSUFBSSxPQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBRyxDQUFDO1lBRTVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixrQkFBa0IsSUFBSSxHQUFHLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUFuRVEsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7O09BQ0EsZ0JBQWdCLENBb0U1QjtJQUFELHVCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1ibHVldG9vdGhcIik7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJsdWV0b290aFNlcnZpY2Uge1xuICAgIERFRkFVTFRfU0VSVklDRV9VVUlEOiBzdHJpbmcgPSBcIkZGRTBcIjtcbiAgICBERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQ6IHN0cmluZyA9IFwiRkZFMVwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2VudHJhbERldmljZVBlcm1pc3Npb24oKS50aGVuKGdyYW50ZWQgPT4ge1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENlbnRyYWxEZXZpY2VQZXJtaXNzaW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXG4gICAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGFzIGxvY2F0aW9uIHBlcm1pc3Npb24gPyBcIiArIGdyYW50ZWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFncmFudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsdWV0b290aC5yZXF1ZXN0Q29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKCkudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIHBlcm1pc3Npb24gcmVxdWVzdGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JhbnRlZDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbm5lY3RUb0JsdWV0b290aChVVUlEOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGJsdWV0b290aC5jb25uZWN0KHtcbiAgICAgICAgICAgICAgICBVVUlEOiBVVUlELFxuICAgICAgICAgICAgICAgIG9uQ29ubmVjdGVkOiBmdW5jdGlvbiAocGVyaXBoZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBFUklQSEVSQUwgQ09OTkVDVEVEIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGVyaXBoZXJhbCkpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gKHBlcmlwaGVyYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyaXBlcmhhbCBkaXNjb25uZWN0ZWQgd2l0aCBVVUlEOiBcIiArIHBlcmlwaGVyYWwuVVVJRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2VUb0JsZURldmljZShVVUlEOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgYmx1ZXRvb3RoLndyaXRlV2l0aG91dFJlc3BvbnNlKHtcbiAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOiBVVUlELFxuICAgICAgICAgICAgc2VydmljZVVVSUQ6IHNlbGYuREVGQVVMVF9TRVJWSUNFX1VVSUQsXG4gICAgICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6IHNlbGYuREVGQVVMVF9DSEFSQUNURVJJU1RJQ19VVUlELFxuICAgICAgICAgICAgdmFsdWU6IHNlbGYuc3RyaW5nVG9CbHVldG9vdGhIZXhTdHJpbmcobWVzc2FnZSkgLy8gYSBoZXhcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIHdyaXR0ZW5cIiwgbWVzc2FnZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3JpdGUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RyaW5nVG9CbHVldG9vdGhIZXhTdHJpbmcoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICB2YXIgYmx1ZXRvb3RoSGV4U3RyaW5nOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYmx1ZXRvb3RoSGV4U3RyaW5nICs9IGAweCR7c3RyLmNoYXJDb2RlQXQoaSkudG9TdHJpbmcoMTYpfWA7XG5cbiAgICAgICAgICAgIGlmIChpIDwgKHN0ci5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgIGJsdWV0b290aEhleFN0cmluZyArPSBcIixcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQkxVRVRPT1RIIEhFWCBTVFJJTkc6IFwiLCBibHVldG9vdGhIZXhTdHJpbmcpO1xuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoSGV4U3RyaW5nO1xuICAgIH1cbn0iXX0=