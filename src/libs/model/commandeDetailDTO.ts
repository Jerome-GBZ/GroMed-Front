/**
 * Gromed API
 * L\'api de gromed contenant tout les endpoints et les définitions des schémas
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PresentationRecapCommandeDTO } from './presentationRecapCommandeDTO';
import { LivraisonDetailDTO } from './livraisonDetailDTO';


/**
 * détail d\'une commande
 */
export interface CommandeDetailDTO { 
    /**
     * Date de la commande
     */
    dateCommande?: string;
    /**
     * Si la livraison est entièrement livrée ou non
     */
    delivered?: boolean;
    /**
     * Liste des livraisons de la commande
     */
    livraisons?: Array<LivraisonDetailDTO>;
    /**
     * recap des presentations de la commande
     */
    recapCommande?: Array<PresentationRecapCommandeDTO>;
}
