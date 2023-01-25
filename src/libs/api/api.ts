export * from './presentationController.service';
import { PresentationControllerService } from './presentationController.service';
export * from './utilisateurController.service';
import { UtilisateurControllerService } from './utilisateurController.service';
export const APIS = [PresentationControllerService, UtilisateurControllerService];
