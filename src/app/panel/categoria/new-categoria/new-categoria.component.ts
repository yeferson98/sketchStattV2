import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.css']
})
export class NewCategoriaComponent implements OnInit {
  private image: any;
  constructor( private categoriaservice:CategoriaService, private toastr:ToastrService ) { }

  ngOnInit() {
    this.categoriaservice.getcategoryAll();
    this.resetForm();
  }
  handImageCategory(event: any): void {
    this.image = event.target.files[0];
  }
  onSubmit(categoriaForm:NgForm){
    debugger
    if(categoriaForm.value.id == null){
      this.categoriaservice.insertCategory(categoriaForm.value, this.image);
      this.resetForm(categoriaForm);
      this.toastr.success('Ok','¡Hecho!, Categoria Registrada');
    }else{
      this.categoriaservice.updatedcategoria(categoriaForm.value,  this.image);
      this.resetForm(categoriaForm);
      this.toastr.success('Ok','¡Hecho!, Categoria Actualizada');
    }
  }
  resetForm(especialidadForm?:NgForm)
  {
     if(especialidadForm != null){
       especialidadForm.reset();
       this.categoriaservice.selectedCategoria =new Categoria();
     }
  }

}
