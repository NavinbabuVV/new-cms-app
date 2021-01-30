import { NgModule } from "@angular/core";
import { ExampleComponent } from "./example/example.component";
import { IonicModule } from '@ionic/angular';
@NgModule({
    declarations: [ExampleComponent],
    exports: [ExampleComponent],
    imports: [IonicModule],
})

export class ComponentsModule{}