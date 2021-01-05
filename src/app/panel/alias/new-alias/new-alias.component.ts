import { Component, OnInit } from '@angular/core';
import { AliasService } from 'src/app/services/alias.service';
import { ToastrService } from 'ngx-toastr';
import { Alias } from 'src/app/models/alias';
import { NgForm } from '@angular/forms';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-new-alias',
  templateUrl: './new-alias.component.html',
  styleUrls: ['./new-alias.component.css']
})
export class NewAliasComponent implements OnInit {

  constructor(private aliasService:AliasService,private toastr: ToastrService,private especialidadService:EspecialidadService, private categoriaservice:CategoriaService) { }
  EspecialidadList:Especialidad[];
  CategoriaList:Categoria[];
  ngOnInit() {
    this.aliasService.getAlias();
    this.resetForm();
    this.especialidadService.getEspecialidades().subscribe(snapshot => {
      this.EspecialidadList= snapshot.map(item=>{
         return {
           $key:item.payload.doc.id,
           ...item.payload.doc.data() as Especialidad
         } as  Especialidad;
       });
     });
    this.categoriaservice.getcategoryAll().subscribe(snapshot => {
      this.CategoriaList= snapshot.map(item=>{
         return {
           id:item.payload.doc.id,
           ...item.payload.doc.data() as Categoria
         } as  Categoria;
       });
     });
  }
  onSubmit(aliasForm:NgForm)
  {
    if (aliasForm.value.$key == null)
    {
      this.aliasService.insertNewAlias(aliasForm.value);
      this.resetForm(aliasForm);
      this.toastr.success('Successfull Operations','¡Hecho!, Alias registrado con exito');
    } else {
      this.aliasService.updatedAlias(aliasForm.value);
      this.resetForm(aliasForm);
      this.toastr.success('Successfull Operations','¡Hecho!, Alias actualizado con exito');
    }
    
  }
  
  resetForm(especialidadForm?:NgForm)
  {
     if(especialidadForm != null){
       especialidadForm.reset();
       this.aliasService.selectedalias =new Alias();
       this.toastr.success('Successfull Operations','¡Hecho!');
     }
  }

}
