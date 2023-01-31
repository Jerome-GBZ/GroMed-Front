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


/**
 * DTO de la commande
 */
export interface CommandeModel { 
    /**
     * Numero de la commande
     */
    numeroCommande?: number;
    /**
     * Date de la commande
     */
    dateCommande?: string;
    /**
     * Status de la commande
     */
    status?: string;
    /**
     * Indique si la livraison est livrée en une fois
     */
    delivered?: boolean;
    /**
     * Total de la commande
     */
    total?: number;
    /**
     * Nombre de presentation dans la commande
     */
    nombrePresentation?: number;
}
