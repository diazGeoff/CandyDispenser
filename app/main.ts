import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as camera from "nativescript-camera";
import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
