import { Injectable } from "@angular/core";
import { Categoria } from "../models/categoria";
import { Observable, combineLatest, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { FileI } from "../models/file";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  selectedCategoria: Categoria = new Categoria();
  $joined$: Observable<any>;
  private filePath: any;
  constructor(
    private firestoreCloud: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getcategoryAll() {
    return this.firestoreCloud.collection("category").snapshotChanges();
  }
  insertCategory(categoria: Categoria, image: FileI) {
    debugger;
    this.filePath = `category/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((UrlImage) => {
            this.firestoreCloud.collection("category").add({
              nombre: categoria.nombre,
              image: UrlImage,
              description: categoria.description,
            });
          });
        })
      )
      .subscribe();
  }
  updatedcategoria(categoria: Categoria, image: FileI) {
    debugger;
    this.filePath = `category/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    if (categoria.image == null || categoria.image == "") {
      task.snapshotChanges().pipe(finalize(() => {
            fileRef.getDownloadURL().subscribe((UrlImage) => {
              this.firestoreCloud.doc("category/" + categoria.id).update({
                nombre: categoria.nombre,
                image: UrlImage,
                description: categoria.description,
              });
            });
          })
        )
        .subscribe();
    }else{
      this.firestoreCloud.doc("category/" + categoria.id).update({
        nombre: categoria.nombre,
        image: categoria.image,
        description: categoria.description,
      });
    }
  }

  deletecategoria($key: string) {
    this.firestoreCloud.doc("category/" + $key).delete();
  }
}
