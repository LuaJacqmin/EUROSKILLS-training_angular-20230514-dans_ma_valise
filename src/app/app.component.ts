import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { valiseItem, allValiseItem } from './models/valiseItem'
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  public newItemForm = new FormGroup(
    {
      newItemName: new FormControl('', Validators.required),
      newItemPlace: new FormControl('soute', Validators.required)
    }
  )

  public notificationMessage: string = "Objet supprimé !";
  public isNotifActive: boolean = false;;
  public valiseItems: allValiseItem = {
    soute:[],
    cabine: [],
    main: []
  } 

  public activeTabName: string = 'soute';
  public itemNumbers: any = {
    soute: 0,
    cabine: 0,
    main: 0
  }

  private newItemInformation: valiseItem;

  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
  ){

  }

  ngOnInit(): void {
    this.newItemForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.newItemInformation = {
          name: data.newItemName,
          isInValise: false,
          place: data.newItemPlace,
        }
      })

      this.getFromLocalStorage()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  public addItemToList(){
    if(this.newItemForm.valid){
      let place = this.newItemForm.get('newItemPlace').value
      switch(place){
        case 'main':
          this.valiseItems.main = [...this.valiseItems.main, this.newItemInformation];
          break;

        case 'cabine':
          this.valiseItems.cabine = [...this.valiseItems.cabine, this.newItemInformation];
          break;

        case 'soute':
          this.valiseItems.soute = [...this.valiseItems.soute, this.newItemInformation];
          break;
      }

      this.itemNumbers[place]++
      this.isNotifActive = true;
      this.notificationMessage = "Objet ajouté !"

      this.newItemForm.patchValue({newItemName: ''})

      this.setIntoLocalStorage(this.valiseItems)

      setTimeout(() => {
        this.isNotifActive = false;
      }, 1000);
    }
  }

  public activeTab(tabName){
    this.activeTabName = tabName
  }

  public checkItem(event){
    for(let [place, items] of Object.entries(this.valiseItems)){
      let i = 0;

      items.forEach(item => {
        if(event.id === i && place === event.place){
          if(!item.isInValise){
            item.isInValise = true;
            this.itemNumbers[place] - 1 >= 0 && (this.itemNumbers[place]--)
          } else {
            item.isInValise = false;
            this.itemNumbers[place]++
          }

          this.setIntoLocalStorage(this.valiseItems)
        }
        i++;
      });
    }
  }

  public deleteItem(event){
    for(let [place, items] of Object.entries(this.valiseItems)){
      let i = 0;
      items.forEach(item => {
        if(event.id === i && place === event.place){
          items.splice(i, 1);
          this.itemNumbers[place] - 1 >= 0 && (this.itemNumbers[place]--);

          this.isNotifActive = true;
          this.notificationMessage = "Objet supprimé !"
          
          this.setIntoLocalStorage(this.valiseItems)

          setTimeout(() => {
            this.isNotifActive = false;
          }, 1000)
        }
        i++;
      });
    }
  }

  private getFromLocalStorage(){
    let storedContent = localStorage.getItem('valiseContent')
    if(storedContent && storedContent !== 'undefined'){
      let i = 0;

      this.valiseItems = JSON.parse(storedContent)

      for(let [place, items] of Object.entries(this.valiseItems)){
        items.forEach(item => {
          item.isInValise === false && (this.itemNumbers[place]++)

          i++;
        });
      }
    }
  }

  private setIntoLocalStorage(content){
    localStorage.setItem('valiseContent', JSON.stringify(content))
  }

  public test = ["pain", "salade", "tomate"];

  public drop(event: CdkDragDrop<valiseItem[]>) {
    console.log("dropped out-o")
  }
}

