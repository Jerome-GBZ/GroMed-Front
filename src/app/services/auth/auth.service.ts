import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilisateurControllerService } from 'src/libs';
import { UtilisateurModel } from 'src/libs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private utilisateurSubject = new Subject<UtilisateurModel>();

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

  updatePanier(utilisateur: UtilisateurModel): void {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));

    this.utilisateurSubject.next(utilisateur);
  }

  get utilisateurObservable() {
    return this.utilisateurSubject.asObservable();
  }

  removeUtilisateur(): void {
    localStorage.removeItem('utilisateur');
  }

  resetPanier(): void {
    let utilisateur = this.getUtilisateur();

    if(utilisateur) {
      utilisateur.nbMedicamentsPanier = 0;
      this.updatePanier(utilisateur);
    }
  }

  logout(): void {
    this.removeUtilisateur();
    this.router.navigate(['/welcome']);
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