import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { StoryViewerPage } from '../story-viewer/story-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private stories: any = new Array<any>();

  constructor(public navCtrl: NavController, public modalCtrl: ModalController){

    let storyItem1 = {
      userPicture: "https://ionicframework.com/docs/v3/dist/preview-app/www/assets/img/venkman.jpg",
      userId: 1,
      userName: "Venkman",
      currentItem: 0,
      items: [{
        date: "há 20 minutos",
        duration: "5",
        id: "3",
        media: "https://i.pinimg.com/originals/17/09/b1/1709b1e8c1a90c2439a670b72d5c86ac.jpg",
        seen: true,
        type: "0",
        views: 5
      }],
      seen: true
    };

    let storyItem2 = {
      userPicture: "https://ionicframework.com/docs/v3/dist/preview-app/www/assets/img/spengler.jpg",
      userId: 2,
      userName: "Egon",
      currentItem: 0,
      seen: false,
      items: [{
        date: "há 30 minutos",
        duration: "4",
        id: "64",
        media: "https://i.pinimg.com/originals/99/58/5f/99585f9b98b93221d89b1c3fec186614.jpg",
        seen: false,
        type: "0",
        views: null
      },{
        date: "há 30 minutos",
        duration: "3",
        id: "74",
        media: "https://i.pinimg.com/originals/5f/2e/05/5f2e05168f7dc071d4a76c80f99d2b8c.jpg",
        seen: false,
        type: "0",
        views: null
      }]
    };

    let storyItem3 = {
      userPicture: "https://ionicframework.com/docs/v3/dist/preview-app/www/assets/img/stantz.jpg",
      userId: 1,
      userName: "Raio",
      currentItem: 0,
      items: [{
        date: "há 20 minutos",
        duration: "5",
        id: "3",
        media: "https://i.pinimg.com/736x/e2/c5/d4/e2c5d47937d008cebdd51afbb85d00ef.jpg",
        seen: true,
        type: "0",
        views: 5
      }],
      seen: true
    };

    let storyItem4 = {
      userPicture: "https://ionicframework.com/docs/v3/dist/preview-app/www/assets/img/winston.jpg",
      userId: 2,
      userName: "Winston",
      currentItem: 0,
      seen: false,
      items: [{
        date: "há 30 minutos",
        duration: "4",
        id: "64",
        media: "https://i.pinimg.com/originals/b1/74/39/b174393095d0d4d0e5af0bdb47e63d31.jpg",
        seen: false,
        type: "0",
        views: null
      },{
        date: "há 30 minutos",
        duration: null,
        id: "74",
        media: "assets/videos/meme.mp4",
        seen: false,
        type: "1",
        views: null
      }]
    };

    this.stories.push(storyItem1);
    this.stories.push(storyItem2);
    this.stories.push(storyItem3);
    this.stories.push(storyItem4);

    this.reorderStories();
  }

  openStoryViewer(index: number){
    let modal = this.modalCtrl.create(StoryViewerPage, { stories: this.stories, tapped: index });
    modal.onDidDismiss(() => {
      this.reorderStories();
    });
    modal.present();
  }

  reorderStories(){
    this.stories.sort((a, b) => {
      if(a.seen) return 1;
      if(b.seen) return -1;

      return 0;
    });
  }
}
