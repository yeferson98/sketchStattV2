import { Component, OnInit } from "@angular/core";
import { ProfesionalService } from "src/app/services/profesional.service";
import { ToastrService } from "ngx-toastr";
import { Profesional } from "src/app/models/profesional";

@Component({
  selector: "app-list-profesionales",
  templateUrl: "./list-profesionales.component.html",
  styleUrls: ["./list-profesionales.component.css"],
})
export class ListProfesionalesComponent implements OnInit {
  profesionList: Profesional[];
  Departamento: [];
  constructor(
    private profesionService: ProfesionalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.profesionService.getprofesion().subscribe(snapshot => {
      this.profesionList= snapshot.map(item=>{
         return {
           $key:item.payload.doc.id,
           ...item.payload.doc.data() as Profesional
         } as  Profesional;
       });
     });
  }

}
