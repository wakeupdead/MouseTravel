import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  declarations: [],
  entryComponents: [],
})
export class SharedModule {}
