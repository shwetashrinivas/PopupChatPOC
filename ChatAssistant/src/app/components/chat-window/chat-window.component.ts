import { Component, OnInit } from '@angular/core';
import { faRobot, faCommentAlt, faLocationArrow , faArrowAltCircleRight,faWindowMinimize, faWindowClose , faMinus} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../theme/theme.service';

import { Option } from "../../theme/option.model";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  faCommentAlt = faCommentAlt;
  faLocationArrow = faLocationArrow;
  faArrowAltCircleRight =faArrowAltCircleRight;
  faWindowMinimize = faWindowMinimize;
  faWindowClose =faWindowClose;
  faRobot =faRobot;
  faMinus = faMinus;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.setThemeOptions("deeppurple-amber");

  }


  openForm(){
    document.getElementById("myForm").style.display = "block";
  }
 
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  toggle() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }


  // For dynamic theme
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  themeChangeHandler(themeToSet) {
    this.themeService.setThemeOptions(themeToSet);
  }
}
