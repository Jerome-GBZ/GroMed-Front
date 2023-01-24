import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { PagePresentationCardModel, PresentationCardModel, PresentationControllerService } from "../../../libs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  width: number = window.innerWidth;
  numberOfPages: number = 0;
  isLoading = true;
  medicamentCards : Array<PresentationCardModel> = new Array()

  constructor(private presentationService: PresentationControllerService) { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.presentationService.getAllPresentations().subscribe(
      (data: PagePresentationCardModel)=>{
        this.isLoading = false;
        if(data !== undefined){
          this.numberOfPages = data.totalPages!!;
          this.medicamentCards = data.content!!;
        }
      }
    )
  }

  paginate(page: number){
    this.isLoading = true;
    this.presentationService.getAllPresentations().subscribe(
      (data: PagePresentationCardModel)=>{
        this.isLoading = false;
        if(data !== undefined){
          this.numberOfPages = data.totalPages!!;
          this.medicamentCards = data.content!!;
        }
      }
    )
  }

}
