import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from "../../services/player.service";
import { SessionService } from "../../services/session.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  canPlayAudio: boolean = false;
  @ViewChild('audioElm') audio: ElementRef;

  constructor(private playerService: PlayerService,
    private sessionService: SessionService) { }

  ngOnInit() {

    this.audio.nativeElement.oncanplay = this.myOnCanPlayFunction;
    this.audio.nativeElement.oncanplaythrough = this.myOnCanPlayThroughFunction;
    this.audio.nativeElement.onloadeddata = this.myOnLoadedData;

    this.sessionService.afterSession().subscribe(() => {
      this.audio.nativeElement.controls = true;
      this.audio.nativeElement.src = "http://syncsong.zencess.com/uploads/song.mp3";
      this.audio.nativeElement.load();
      console.log("this.audio", this.audio);
    });

    this.playerService.playSubj.subscribe((flag) => {
      if (flag) {
        if (this.canPlayAudio) {
          console.log("Playing Now");
          this.audio.nativeElement.play();
        } else {
          console.error("Song is not loaded");
        }
      }
    });

    this.playerService.resetPlayerSubj.subscribe((flag) => {
      if (flag) {
        this.audio.nativeElement.pause();
        this.audio.nativeElement.currentTime = 0;
      }
    });
  }


  myOnCanPlayFunction = (event) => {
    console.log("CAN PLAY", event);
    this.canPlayAudio = true;
  }
  myOnCanPlayThroughFunction() {
    console.log("OnCanPlayThrough");

  }
  myOnLoadedData() {
    console.log("LOADED");
  }

  playSong = () => {
    if (this.canPlayAudio) {
      console.log("Playing Now");
      this.audio.nativeElement.play();
    } else {
      console.error("Song is not loaded");
    }
  }
  pauseSong() {
    this.audio.nativeElement.pause();
  }

  // playSong = () => {
  //   this.playerService.play();

  // }
  // pauseSong() {
  //   this.playerService.pause();
  // }
}
