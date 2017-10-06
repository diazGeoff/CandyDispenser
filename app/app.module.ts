import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { CloudVisionComponent } from "./pages/cloud-vision/cloud-vision.component";
import { VisionService } from "./service/vision/vision.service";
import { BluetoothService } from "./service/bluetooth/bluetooth.service";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    CloudVisionComponent
  ],
  bootstrap: [
    CloudVisionComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule
  ],
  providers: [
    VisionService,
    BluetoothService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
