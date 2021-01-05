import { Component, OnInit } from '@angular/core';
import {EspecialidadService} from '../../../services/especialidad.service';
import { from } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    EspecialidadList:Especialidad[];
  constructor(
    private especialidadService:EspecialidadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.especialidadService.getEspecialidades().subscribe(snapshot => {
      this.EspecialidadList= snapshot.map(item=>{
         return {
           $key:item.payload.doc.id,
           ...item.payload.doc.data() as Especialidad
         } as  Especialidad;
       });
     });
  }
  onEdit(especialidad:Especialidad)
  {
    debugger
    this.especialidadService.selectedEspecialidad = Object.assign({},especialidad);
    this.toastr.success('Ok','Preparando para editar');
  }

  onDelete($key:string)
  {
    this.especialidadService.deleteEspecialidad($key);
    this.toastr.success('ok','Especialidad Eliminada');
  }

}
