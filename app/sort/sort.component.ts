import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
 @Output() sortby = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  sortByName() {
   this.sortby.emit('name');
  }
  sortBypriceLow() {
   this.sortby.emit('low');
  }
  sortBypriceHigh() {
  this.sortby.emit('high');
  }
}
