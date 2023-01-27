import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PresentationPanierModel, LivraisonModel } from 'src/libs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  @Input() total: number = 0;
  @Input() medicamentsLine: Array<PresentationPanierModel> = new Array();
  @Input() livraison: LivraisonModel | undefined;

  @Output() stepItemEvent = new EventEmitter<number>();

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.resetPanier();
  }

  options: AnimationOptions = {
    path: '/assets/lottie/delivery.json'
  };

  nextStep(value: number) {
    this.stepItemEvent.emit(value);
  }
}
