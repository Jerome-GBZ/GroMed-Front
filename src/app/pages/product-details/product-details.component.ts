import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { PresentationControllerService, PresentationDetailModel } from 'src/libs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
[x: string]: any;
  width: number = window.innerWidth;
  subtotal: number = 0;

  medicamentDetails? : PresentationDetailModel

  public constructor(
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationControllerService,
    public location:Location){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.presentationService.getDetailPresentation(id).subscribe( (data: PresentationDetailModel) => {
          if(data !== undefined){
            this.medicamentDetails = data;
            this.subtotal = data.prix!!;
          }
        }
      )
      
    });
  }

  public convertToNumber(value: string): number{
    return Number(value);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  getSubtotal(quantity: string){
    this.subtotal = Number((Number(quantity)*this.medicamentDetails!!.prix!).toFixed(2))
  }
}
