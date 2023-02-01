import { Component, HostListener, OnInit } from '@angular/core';
import { PagePresentationCardModel } from 'src/libs/model/pagePresentationCardModel';
import { FiltreControllerService, Filtres, PresentationCardModel, PresentationControllerService } from "../../../libs";
import { AnimationOptions } from "ngx-lottie";

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
  selectedComposition: string[] = [] ;
  filteredTitulaire = Array();
  titulaires = Array();
  selectedTitulaire: string[] = []  ;
  disponibleSelected = false;
  generiqueSelected = false;
  originalSelected = false;
  searchState = false;
  searchText = "";
  currentPriceFiltrerState = PriceFilter.NONE;
  PriceFilter: typeof PriceFilter = PriceFilter;

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
    this.filterService.getFiltres().subscribe(
      (data: Filtres) => {
        if(data !== undefined){
          this.compositions = data.substancesDenomitations!!
          this.titulaires = data.titulaires !!
        }
      }
    )
  }

  searchFiltres(): void{
    console.log("search text: "+this.searchText);
    console.log("current price filter: "+ this.currentPriceFiltrerState.toString());
    this.showFilters = false;
    this.presentationService.getPresentations(
      {page: 0, size: 24, sort: [this.currentPriceFiltrerState.toString()]}, { 
      presentationName: this.searchText,
      titulaires: this.selectedTitulaire,
      substancesDenomitations: this.selectedComposition,
      original: this.originalSelected,
      generique: this.generiqueSelected,
      available: this.disponibleSelected
    }).subscribe(
      (data: PagePresentationCardModel)=>{
        this.isLoading = false;
        if(data !== undefined){
          this.numberOfPages = data.totalPages!!;
          console.log("nb pages:"+this.numberOfPages);
          this.medicamentCards = data.content!!;
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
    this.presentationService.getPresentations(
      {page: page, size:24}, { 
      presentationName: this.searchText,
      titulaires: this.selectedTitulaire,
      substancesDenomitations: this.selectedComposition,
      original: this.originalSelected,
      generique: this.generiqueSelected,
      available: this.disponibleSelected
    }).subscribe(
      (data: PagePresentationCardModel)=>{
        this.isLoading = false;
        if(data !== undefined){
          this.numberOfPages = data.totalPages!!;
          this.medicamentCards = data.content!!;
        }
      }
    )
  }

  checkIfIsFiltred(): boolean{
    return this.filteredTitulaire.length > 0 || this.filteredComposition.length > 0 || this.disponibleSelected || this.originalSelected || this.generiqueSelected
  }

  changePriceFilter() {
    switch(this.currentPriceFiltrerState){
      case PriceFilter.NONE:
        this.currentPriceFiltrerState =  PriceFilter.PRICE_ASC;
        break;
      case PriceFilter.PRICE_ASC:
          this.currentPriceFiltrerState =  PriceFilter.PRICE_DSC;
          break;
      case PriceFilter.PRICE_DSC:
        this.currentPriceFiltrerState =  PriceFilter.NONE;
        break;
    }
    this.searchFiltres();
  }
}

export enum PriceFilter {
  PRICE_ASC = "prix,asc",
  PRICE_DSC  = "prix,desc",
  NONE = ""
}
