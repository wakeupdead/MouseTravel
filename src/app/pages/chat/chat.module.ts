import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChatPage } from './chat/chat';
import { ChatService } from './services/chat.service';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatPage
      }
    ])
  ],
  declarations: [ChatPage],
  providers: [
    ChatService
  ]
})
export class ChatModule {}
