import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html',
  styleUrls: ['./add-buttons.component.css']
})
export class AddButtonsComponent implements OnInit {

  constructor(public router: Router) { }


  ngOnInit(): void {
  }

  newPost():void{
    this.router.navigate(['post'])
  }
  newEvent():void{

  }

}
