import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/model/session.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  constructor(private session:Session) { }

  ngOnInit(): void {
    this.session.isSearchShown = false;
  }

}
