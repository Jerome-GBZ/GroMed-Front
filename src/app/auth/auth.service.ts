import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilisateurControllerService } from '../../libs/api/utilisateurController.service';
import { UtilisateurModel } from './../../libs/model/utilisateurModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, public utilisateurService: UtilisateurControllerService) { }

  login(email: string, password: string): Observable<{success: boolean, message: string}> {
      return this.utilisateurService.authenticate(email, password).pipe(
        map((data: UtilisateurModel) => {
            localStorage.setItem('utilisateur', JSON.stringify(data));

            return { success: true, message: "Vous etes maintenant connecté." };
        }
      ),
      catchError((error: Error) => of({ success: false, message: "Email ou mot de passe incorrect." })));
  }

  isAuthenticated(): boolean {
    return this.getUtilisateur() ? true : false;
  }

  getUtilisateur(): UtilisateurModel | undefined {
    const utilisateurString = localStorage.getItem('utilisateur');
    return utilisateurString ? JSON.parse(utilisateurString) : undefined;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}