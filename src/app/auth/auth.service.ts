import { UtilisateurControllerService } from 'src/libs/api/utilisateurController.service';
import { UtilisateurModel } from './../../libs/model/utilisateurModel';
import { catchError, map, Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, private utilisateurService: UtilisateurControllerService) { }

  login(email: string, password: string): Observable<{success: boolean, message: string}> {
      return this.utilisateurService.getConnection(email, password).pipe(
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

  getUtilisateur(): UtilisateurModel | boolean {
    const utilisateurString = localStorage.getItem('utilisateur');
    return utilisateurString ? JSON.parse(utilisateurString) : false;
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