import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-story-viewer',
  templateUrl: 'story-viewer.html',
})
export class StoryViewerPage {

  @ViewChild(Slides) slides: Slides;

  @ViewChild('progress') set progressElement(progress:any){
    if(progress){
      progress = progress.nativeElement;

      progress.addEventListener('animationend', () => {
        this.nextStoryItem();
      });
      progress.addEventListener('webKitAnimationend', () => {
        this.nextStoryItem();
      });
    }
  }

  @ViewChild('video') set videoElement(video:any){
    if(video){
      this.video = video.nativeElement;

      this.video.onwaiting = () => { this.isWaiting = true };
      this.video.onready = this.video.onload = this.video.onplaying = this.video.oncanplay = () => { this.isWaiting = false };

      this.video.addEventListener('loadedmetadata', () => {
        let storyVideo = this.getCurrentStoryItem();

        if(this.video.duration && !storyVideo.duration){
          storyVideo.duration = this.video.duration;
        }

        this.video.play();
      });
    }else{
      if(this.video){
        this.video = null;
      }
    }
  }

  private video: any;
  private isWaiting:boolean = false;

  private stories: any = new Array<any>();
  private tapped: number;
  private isPaused: boolean = false;

  private userId:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public platform: Platform){
    this.stories = this.navParams.get("stories");
    this.tapped = this.navParams.get("tapped");
  }

  ngAfterViewInit(){
    this.slides.initialSlide = this.tapped;
  }

  closeStoryViewer(){
    this.viewCtrl.dismiss();
  }

  getCurrentStory(){
    return this.stories[this.slides.getActiveIndex()]
  }

  nextStoryItem(){
    if(this.getCurrentStory().currentItem < this.getCurrentStory().items.length - 1){
      this.getCurrentStory().currentItem += 1;
      this.setStorySeen();
    }else{
      if(this.slides.isEnd()){
        this.closeStoryViewer();
      }else{
        this.slides.slideNext();
      }
    }
  }

  pauseStory(){
    this.isPaused = true;
  }

  playStory(){
    this.isPaused = false;
  }

  getCurrentStoryItem(){
    let currentStory = this.getCurrentStory();

    if(currentStory){
      return currentStory.items[currentStory.currentItem];
    }
  }

  isLoading(indexStory:number){
    let storyItem = this.getCurrentStoryItem();

    if(storyItem){
      return !storyItem.duration && storyItem.type == 1 && indexStory == this.slides.getActiveIndex();
    }else{
      return true;
    }
  }

  changeStoryItem(event, story){
    if(event.center.y > 70 || event.center.y > this.platform.height() - 70){
      return;
    }

    if(event.center.x < this.platform.width()/2){
      if(story.currentItem > 0){
        story.currentItem--;
        this.setStorySeen();
      }else{
        this.slides.slidePrev();
      }
    }else{
      this.nextStoryItem();
    }
  }

  onSwipeUp(){
    alert('Swipe up');
  }

  setStorySeen(){
    let story = this.getCurrentStory();
    let storyItem = this.getCurrentStoryItem();

    if(!storyItem.seen){
      if(story.currentItem === story.items.length - 1){
        story.seen = true;
      }
      storyItem.seen = true;
    }
  }

  ionViewDidEnter(){
    this.setStorySeen();
  }
}
