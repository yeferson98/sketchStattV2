import { Component, OnInit } from '@angular/core';
import {EspecialidadService} from '../../../services/especialidad.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Especialidad } from 'src/app/models/especialidad';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  CategoriaList:Categoria[];
  constructor(private especialidadservice:EspecialidadService,private toastr: ToastrService,  private categoriaservice:CategoriaService) { }

  ngOnInit() {
    this.especialidadservice.getEspecialidades();
    this.resetForm();
    this.categoriaservice.getcategoryAll().subscribe(snapshot => {
      this.CategoriaList= snapshot.map(item=>{
         return {
           id:item.payload.doc.id,
           ...item.payload.doc.data() as Categoria
         } as  Categoria;
       });
     });
  }

  onSubmit(especialidadForm:NgForm)
  {
    debugger
    if (especialidadForm.value.$key == null)
    {
      this.especialidadservice.insertEspecialidad(especialidadForm.value);
      this.resetForm(especialidadForm);
      this.toastr.success('Ok','¡Hecho!, Producto registrado con exito');
    } else {
      this.especialidadservice.updatedEspecialidad(especialidadForm.value);
      this.resetForm(especialidadForm);
      this.toastr.success('Ok','¡Hecho!, Producto actualizado con exito');
    }
    
  }
  resetForm(especialidadForm?:NgForm)
  {
     if(especialidadForm != null){
       especialidadForm.reset();
       this.especialidadservice.selectedEspecialidad =new Especialidad();
     }
  }

}
