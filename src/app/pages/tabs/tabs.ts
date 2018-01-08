import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'ListMasterPage';
  tab2Root: any = 'ChatPage';

  tab1Title = ' ';
  tab2Title = ' ';

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB_ITEMS_TITLE', 'TAB_CHAT_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB_ITEMS_TITLE'];
      this.tab2Title = values['TAB_CHAT_TITLE'];
    });
  }
}
