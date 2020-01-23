import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { ScreenElementsService } from 'src/services/screen-elements.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  spinnerMessage: string;
  _opened = true;

  constructor(private sharedService: SharedService, private router: Router, private screenElementsService: ScreenElementsService) { }

  ngOnInit() {
  }

  onActivate(componentReference) {
    this.spinnerMessage = componentReference.hasOwnProperty('spinnerMessage') ? componentReference.spinnerMessage : 'Cargando...';
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  logOut() {
    this.sharedService.clearLocalStorage();
    this.screenElementsService.clearInternalUser();
    this.router.navigate(['login']);
  }

}
