import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryViewerPage } from './story-viewer';

@NgModule({
  declarations: [
    StoryViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryViewerPage)
  ],
})
export class StoryViewerPageModule {}
