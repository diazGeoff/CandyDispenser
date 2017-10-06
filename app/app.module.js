"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var cloud_vision_component_1 = require("./pages/cloud-vision/cloud-vision.component");
var vision_service_1 = require("./service/vision/vision.service");
var bluetooth_service_1 = require("./service/bluetooth/bluetooth.service");
var http_1 = require("nativescript-angular/http");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                cloud_vision_component_1.CloudVisionComponent
            ],
            bootstrap: [
                cloud_vision_component_1.CloudVisionComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                http_1.NativeScriptHttpModule
            ],
            providers: [
                vision_service_1.VisionService,
                bluetooth_service_1.BluetoothService
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHNGQUFtRjtBQUNuRixrRUFBZ0U7QUFDaEUsMkVBQXlFO0FBQ3pFLGtEQUFtRTtBQUVuRSxpREFBK0M7QUFvQi9DO0lBQUE7SUFBd0IsQ0FBQztJQUFaLFNBQVM7UUFsQnJCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWiw2Q0FBb0I7YUFDckI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsNkNBQW9CO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsNkJBQXNCO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDhCQUFhO2dCQUNiLG9DQUFnQjthQUNqQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUFBLEFBQXpCLElBQXlCO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQ2xvdWRWaXNpb25Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9jbG91ZC12aXNpb24vY2xvdWQtdmlzaW9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmlzaW9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvdmlzaW9uL3Zpc2lvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCbHVldG9vdGhTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9ibHVldG9vdGgvYmx1ZXRvb3RoLnNlcnZpY2VcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBDbG91ZFZpc2lvbkNvbXBvbmVudFxuICBdLFxuICBib290c3RyYXA6IFtcbiAgICBDbG91ZFZpc2lvbkNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVmlzaW9uU2VydmljZSxcbiAgICBCbHVldG9vdGhTZXJ2aWNlXG4gIF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=