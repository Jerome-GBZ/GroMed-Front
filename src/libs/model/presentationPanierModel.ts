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
import { ConditionPrescriptionDTO } from './conditionPrescriptionDTO';
import { InfoImportanteModel } from './infoImportanteModel';


/**
 * DTO représentant une présentation dans le panier
 */
export interface PresentationPanierModel { 
    /**
     * code CIP7 de la présentation
     */
    codeCIP7?: string;
    /**
     * nom de la présentation
     */
    denomination?: string;
    /**
     * quantité de la présentation
     */
    quantite?: number;
    /**
     * prix unitaire de la présentation
     */
    prixUnitaire?: number;
    /**
     * taux de remboursement
     */
    tauxRemboursement?: number;
    /**
     * stock de la présentation
     */
    stock?: number;
    /**
     * liste des informations importantes de la présentation
     */
    infoImportantes?: Array<InfoImportanteModel>;
    /**
     * liste des conditions de prescription de la présentation
     */
    conditionsPrescription?: Array<ConditionPrescriptionDTO>;
}
