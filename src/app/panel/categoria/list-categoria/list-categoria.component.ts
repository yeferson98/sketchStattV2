import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {

  CategoriaList:Categoria[];
  constructor(
    private categoriaService:CategoriaService, private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.categoriaService.getcategoryAll().subscribe(snapshot => {
      this.CategoriaList= snapshot.map(item=>{
         return {
           id:item.payload.doc.id,
           ...item.payload.doc.data() as Categoria
         } as  Categoria;
       });
     });
  }
  onEdit(categoria:Categoria)
  {
  
    this.categoriaService.selectedCategoria = Object.assign({},categoria);
    this.toastr.success('Ok','Preparando para editar');
  }

  onDelete($key:string)
  {
    this.categoriaService.deletecategoria($key);
    this.toastr.success('ok','Categoria Eliminada');
  }
}
