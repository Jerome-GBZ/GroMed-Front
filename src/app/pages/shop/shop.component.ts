import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { PagePresentationCardModel, PresentationControllerService } from "../../../libs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  width: number = window.innerWidth;

  constructor(private presentationService: PresentationControllerService) { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.presentationService.getAllPresentations().subscribe(
      (data: PagePresentationCardModel)=>{
        console.log("data ",data);
      }
    )
  }

}
