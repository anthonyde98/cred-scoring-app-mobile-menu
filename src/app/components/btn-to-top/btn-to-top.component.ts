import { Component, OnInit, Input, Renderer2} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-btn-to-top',
  templateUrl: './btn-to-top.component.html',
  styleUrls: ['./btn-to-top.component.scss'],
})
export class BtnToTopComponent implements OnInit {
  @Input() content: IonContent;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.setColorButton();
  }
  
  scrollTop(){
    this.content.scrollToTop(400);
  }

  async setColorButton(){
    const { value } = await Storage.get({ key: 'color-theme' });

    if(value != null && value == "dark")     
      this.renderer.setAttribute(document.getElementById('btn'),
       'style', 'background-color: #121212;');
    else
      this.renderer.setAttribute(document.getElementById('btn'),
        'style', 'background-color: #fffffffb;');
  }
}
