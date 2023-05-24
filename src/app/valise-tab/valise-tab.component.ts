import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { valiseItem } from '../models/valiseItem';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-valise-tab',
  templateUrl: './valise-tab.component.html',
  styleUrls: ['./valise-tab.component.scss']
})

export class ValiseTabComponent implements OnInit, OnChanges {
  @Input() valiseName: string;
  @Input() valiseContent: Array<valiseItem>;
  @Input() activeTabName: string;
  @Input() itemNumbers:number;

  @Output() checkItemEmit = new EventEmitter();
  @Output() deleteItemEmit = new EventEmitter();
  @Output() activeTabEmit = new EventEmitter();

  public tabName: string;

  constructor() { }

  ngOnChanges(): void {
    switch(this.valiseName){
      case 'cabine':
        this.tabName = "Valise de cabine"
        break;

      case 'soute':
        this.tabName = "Bagage en soute"
        break;

      case 'main':
        this.tabName = "Bagage à main"
        break;
  }
  }

  ngOnInit(): void {
  }

  public checkItem(id, place){
    this.checkItemEmit.emit({id: id, place: place})
  }

  public deleteItem(id, place){
    console.log("item to delete: ", id, place)
    this.deleteItemEmit.emit({id: id, place: place})
  }

  public activeTab(){
    this.activeTabEmit.emit(this.valiseName)
  }

  public sortDrop(event: CdkDragDrop<valiseItem[]>) {
    console.log(event)
  }
}
