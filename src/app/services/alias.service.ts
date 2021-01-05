import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Alias } from "../models/alias";
import { Observable, combineLatest, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { uniq, flatten } from "lodash";
import {auth} from "firebase/app";
import { AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: "root",
})
export class AliasService {
  aliasList: AngularFireList<any>;
  selectedalias: Alias = new Alias();
  $joined$: Observable<any>;
  constructor(
    private firebase: AngularFireDatabase,
    private firestoreCloud: AngularFirestore
  ) {}

  getAlias() {
    return (this.aliasList = this.firebase.list("alias"));
  }
  insertNewAlias(alias: Alias) {
    debugger;
    const specialityRef: AngularFirestoreDocument<any> = this.firestoreCloud.doc(
      `specialty/${alias.id_prod}`
    );
    const categoryRef: AngularFirestoreDocument<any> = this.firestoreCloud.doc(
      `category/${alias.id_cat}`
    );
    this.firestoreCloud.collection("alias").add({
      descripcion: alias.descripcion,
      id_prod: alias.id_prod,
      id_cat: alias.id_cat,
      refSpecialty: specialityRef.ref,
      refCategory:categoryRef.ref
    });
  }
  updatedAlias(alias: Alias) {
    this.firestoreCloud.doc("alias/" + alias.$key).update({
      descripcion: alias.descripcion,
      id_prod: alias.id_prod,
      id_cat: alias.id_cat,
    });
  }

  deleteAlias($key: string) {
    this.firestoreCloud.doc("alias/" + $key).delete();
  }
}
