import { DocumentReference } from 'angularfire2/firestore';

export class Alias {
    $key:string;
    descripcion:string;
    id_prod:string;
    id_cat:string;
    refSpecialty:DocumentReference
}
