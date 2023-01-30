import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { PagePresentationCardModel } from 'src/libs/model/pagePresentationCardModel';
import { FiltreControllerService, Filtres, PresentationCardModel, PresentationControllerService } from "../../../libs";
import { AnimationOptions } from "ngx-lottie";
import { FormControl, NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  showFilters = false;
  compositions = Array();
  titulaireFilter = Array();
  filteredComposition = Array();
  selectedComposition = Array<String>();
  filteredTitulaire = Array();
  titulaires = Array();
  selectedTitulaire = Array<String>();
  disponibleSelected = false;
  generiqueSelected = false;
  originalSelected = false;
  searchState = false;
  searchText = "";


  options: AnimationOptions = {
    path: '/assets/lottie/lottie-shop.json'  
  };  


  constructor(
    private presentationService: PresentationControllerService,
    private filterService: FiltreControllerService
    ) { }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.presentationService.getPresentations({page: 0, size:24}).subscribe(
      (data: PagePresentationCardModel)=>{
        this.isLoading = false;
        if(data !== undefined){
          console.log(data)
          this.numberOfPages = data.totalPages!!;
          this.medicamentCards = data.content!!;
        }
      }
    )

    this.filterService.getFiltres().subscribe(
      (data: Filtres) => {
        if(data !== undefined){
          this.compositions = data.substancesDenomitations!!
          this.titulaires = data.titulaires !!
        }
      }
    )
  }

  filterComposition(event: any) {
    let filtered = Array();
    let query: string = event.query;
    for(let i = 0; i < this.compositions.length; i++) {
      let compo = this.compositions[i];
      if (compo.toLowerCase().trim().indexOf(query.toLowerCase().trim()) == 0) {
          filtered.push(compo);
      }
    }
    this.filteredComposition = filtered;
  }

  filterTitulaire(event: any) {
    let filtered = Array();
    let query: string = event.query;
    for(let i = 0; i < this.titulaires.length; i++) {
      let titu = this.titulaires[i];
      if (titu && titu.toLowerCase().trim().indexOf(query.toLowerCase().trim()) == 0) {
          filtered.push(titu);
      }
    }
    this.filteredTitulaire = filtered;
  }


  paginate(page: number){
    this.isLoading = true;
    this.presentationService.getPresentations({page: page, size:24}).subscribe(
      (data: PagePresentationCardModel) => {
        this.isLoading = false;
        if(data !== undefined){    
          console.log(data)
          this.numberOfPages = data.totalElements!!;
          this.medicamentCards = data.content!!;
        }
      }
    )
  }

  onSearchInputTextChangedListener(value: string){

  }
}
