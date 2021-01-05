import { Injectable, EventEmitter } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Profesional } from "../models/profesional";
import { Observable } from "rxjs";
import { FileI } from "../../app/models/file";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { RestApiBackendService } from "./rest-api-backend.service";
import Departamentos from "src/assets/services/departamentos.json";
import Province from "src/assets/services/provincias.json";
import District from "src/assets/services/distritos.json";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: "root",
})
export class ProfesionalService {
  profesionList: AngularFireList<any>;
  selectedprofesion: Profesional = new Profesional();
  $joined$: Observable<any>;
  nombre$ = new EventEmitter<string>();
  private filePath: any;
  private downloadURL: String;

  constructor(
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage,
    private restApiBack: RestApiBackendService,
    private firestoreCloud: AngularFirestore
  ) {}

  getprofesion() {
    return this.firestoreCloud.collection('profetional').snapshotChanges();
  }
  insertprofesion(profesion: Profesional, clave) {
    let name = Departamentos.filter(
      (p) => p.id_ubigeo === profesion.departamento
    );
    let proc = Province[0];
    let nameprov = proc[profesion.departamento].filter(
      (p) => p.id_ubigeo === profesion.provincia
    );
    let dis = District[0];
    let nameDist = dis[profesion.provincia].filter(
      (p) => p.id_ubigeo === profesion.distrito
    );
    return new Promise((result) => {
      try {
        this.firestoreCloud.collection('profetional').add({
          nombre: profesion.nombre,
          session: "0",
          apellido: profesion.apellido,
          fechaNacimiento: profesion.fechaNacimiento,
          direccionconsultorio: profesion.direccionconsultorio,
          sexo: profesion.sexo,
          celular: profesion.celular,
          urlImg: this.downloadURL,
          idProfesion: profesion.idProfesion,
          tokenAccesso: clave,
          email: profesion.email,
          tokenNotification:"",
          direccion: {
            idDepartamento: name[0].id_ubigeo,
            nameDepartamento: name[0].nombre_ubigeo,
            idProvincia: nameprov[0].id_ubigeo,
            nameProvincia: nameprov[0].nombre_ubigeo,
            idDistrito: nameDist[0].id_ubigeo,
            nameDistrito: nameDist[0].nombre_ubigeo,
          },
        });
        setTimeout(() => {
          result("true");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          result("false");
        }, 1000);
      }
    });
  }

  updatedprofesion(profesion: Profesional) {
    const specialityRef: AngularFirestoreDocument<any> = this.firestoreCloud.doc(
      `specialty/${profesion.idProfesion}`
    );
    this.profesionList.update(profesion.$key, {
      nombre: profesion.nombre,
      apellido: profesion.apellido,
      fechaNacimiento: profesion.fechaNacimiento,
      departamento: profesion.departamento,
      direccionconsultorio: profesion.direccionconsultorio,
      sexo: profesion.sexo,
      celular: profesion.celular,
      urlImg: this.downloadURL,
      idProfesion: profesion.idProfesion,
      refSpeciality: specialityRef.ref
    });
  }

  deleteprofesion($key: string) {
    this.firestoreCloud.doc('profetional/'+$key).delete();
  }
  verificarDato: any;
  public preAddAndUpdatePost(profesion: Profesional, image: FileI, clave: any) {
    return new Promise((result) => {
      this.uploadImage(profesion, image, clave).then((response) => {
        debugger;
        if (response == "true") {
          this.insertprofesion(profesion, clave).then((response) => {
            if (response == "true") {
              setTimeout(() => {
                let formData = new FormData();
                formData.append("email", profesion.email);
                formData.append("clave", clave);
                formData.append("nombre", profesion.nombre);
                this.restApiBack.postEmailProfetional(formData).subscribe(
                  (data) => {
                    if (data.code == 200) {
                      result("true");
                    } else {
                      result("false");
                    }
                  },
                  (err) => result("false")
                );
              }, 1000);
            } else {
              result("false");
            }
          });
        }
      });
    });
  }
  private uploadImage(profesion: Profesional, image: FileI, clave: any) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    return new Promise((result) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((UrlImage) => {
              this.downloadURL = UrlImage;
              console.log("URL_IMAGE", UrlImage);
              ///this.insertprofesion(profesion, clave);
              result("true");
            });
          })
        )
        .subscribe();
    });
  }
}
