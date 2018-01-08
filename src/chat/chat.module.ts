import { NgModule } from '@angular/core';
import { ChatPageModule } from './pages/chat/chat.module';
import { ChatService } from './services/chat.service';


@NgModule({
  imports: [

  ],
  exports: [

  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
