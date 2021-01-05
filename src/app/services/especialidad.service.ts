import { Injectable } from '@angular/core';
import {AngularFirestore}from '@angular/fire/firestore';
import { Especialidad } from '../models/especialidad';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  selectedEspecialidad: Especialidad = new Especialidad();
  constructor(private firestoreCloud: AngularFirestore ) { }

  getEspecialidades()
  {
    return  this.firestoreCloud.collection('specialty').snapshotChanges();
  }

  insertEspecialidad(especialidad:Especialidad)
  {
    this.firestoreCloud.collection('specialty').add({
      descripcion:especialidad.descripcion,
      id_cat:especialidad.id_cat
    });
  }

  updatedEspecialidad(especialidad:Especialidad)
  {
    this.firestoreCloud.doc('specialty/'+especialidad.$key).update({
      descripcion:especialidad.descripcion,
      id_cat:especialidad.id_cat
    });
  }

  deleteEspecialidad($key:string)
  {
    this.firestoreCloud.doc('specialty/'+ $key).delete();
  }
}
