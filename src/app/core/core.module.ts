import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { QuickLinkComponent } from './right-sidebar/quick-link/quick-link.component';
import { AICollaboratorComponent } from './right-sidebar/ai-collaborator/ai-collaborator.component';
import { ChatComponent } from './right-sidebar/chat/chat.component';
import { ComposeComponent } from './right-sidebar/compose/compose.component';
import { InsightComponent } from './right-sidebar/insight/insight.component';
import { AnalyticsComponent } from './right-sidebar/insight/analytics/analytics.component';
import { SiteComponent } from './right-sidebar/insight/site/site.component';
import { FormsModule } from '@angular/forms';

import { ConnectionCardComponent } from './connection-card/connection-card.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RouterModule } from '@angular/router';
import { AppTableComponent } from './table/table.component';
import { AppPaginationComponent } from './pagination/pagination.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';


/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    RightSidebarComponent,
    QuickLinkComponent,
    AICollaboratorComponent,
    ChatComponent,
    ComposeComponent,
    InsightComponent,
    AnalyticsComponent,
    SiteComponent,
    ConnectionCardComponent,
    LeftSidebarComponent,
    AppTableComponent,
    AppPaginationComponent,
    ComingSoonComponent,
    HeaderComponent,
    AlertComponent,
    AlertsComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule, NotifierModule.withConfig(customNotifierOptions)],
  exports: [
    MaterialModule,
    RightSidebarComponent,
    ConnectionCardComponent,
    LeftSidebarComponent,
    AppTableComponent,
    AppPaginationComponent,
    ComingSoonComponent,
    HeaderComponent,
  ],
})
export class CoreModule {}
