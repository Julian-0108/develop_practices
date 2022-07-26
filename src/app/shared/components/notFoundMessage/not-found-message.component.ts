import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found-message',
  templateUrl: './not-found-message.component.html',
  styleUrls: ['./not-found-message.component.scss']
})
export class NotFoundMessageComponent implements OnInit {
  @Input() public message!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
