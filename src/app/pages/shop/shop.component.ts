import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PagePresentationCardModel } from 'src/libs/model/pagePresentationCardModel';
import { FiltreControllerService, Filtres, PresentationCardModel, PresentationControllerService } from "../../../libs";
import { AnimationOptions } from "ngx-lottie";
import { async, debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  width: number = window.innerWidth;
  numberOfPages: number = 0;
  isLoading = false;
  medicamentCards : Subject<Array<PresentationCardModel>> = new Subject();
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
  totalNumberOfPage : Subject<number> = new Subject();
  @ViewChild('search', { static: true }) search?: ElementRef;
  options: AnimationOptions = {
    path: '/assets/lottie/lottie-shop.json'  
  };  

  optionsNotFound: AnimationOptions = {
    path: '/assets/lottie/search-not-found.json'
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

    fromEvent(this.search!!.nativeElement, 'keyup').pipe(
       debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe( _ => {
      this.searchFiltres(0);
    });
  }

  async searchFiltres(page: number) {
    this.medicamentCards.next([]);
    this.numberOfPages = 0;
    this.showFilters = false;
    this.isLoading = true;

    if(this.searchText.trim().length > 0) {
      this.presentationService.getPresentations(
        {page: page, size: 24, sort: [this.currentPriceFiltrerState.toString()]},
        {
          presentationName: this.searchText,
          titulaires: this.selectedTitulaire,
          substancesDenomitations: this.selectedComposition,
          original: this.originalSelected,
          generique: this.generiqueSelected,
          available: this.disponibleSelected
        }
      ).subscribe(
        (data: PagePresentationCardModel)=>{
          this.isLoading = false;
          this.totalNumberOfPage.next(data.totalPages!!)
          this.medicamentCards.next(data.content!!)
        }
      );
    }
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
    this.searchFiltres(0);
  }
}

export enum PriceFilter {
  PRICE_ASC = "prix,asc",
  PRICE_DSC  = "prix,desc",
  NONE = ""
}
