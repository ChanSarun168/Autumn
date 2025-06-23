export interface Ifood{
    name : string;
    price : number;
    type : string;
    thumbnail : string;
    isdeleted ?: boolean;
    description?: string;
    ingredients?: string[];
    cuisine?: string;
    spiciness?: string;
    preparationTime?: number;
}