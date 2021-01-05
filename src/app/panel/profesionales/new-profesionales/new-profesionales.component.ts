import { Component, OnInit, EventEmitter } from "@angular/core";
import { EspecialidadService } from "src/app/services/especialidad.service";
import { Especialidad } from "src/app/models/especialidad";
import { ProfesionalService } from "src/app/services/profesional.service";
import { ToastrService } from "ngx-toastr";
import { Profesional } from "src/app/models/profesional";
import { NgForm } from "@angular/forms";
import { RestApiBackendService } from "src/app/services/rest-api-backend.service";
import "rxjs/add/operator/map";
import Departamentos from "src/assets/services/departamentos.json";
import Province from "src/assets/services/provincias.json";
import District from "src/assets/services/distritos.json";
@Component({
  selector: "app-new-profesionales",
  templateUrl: "./new-profesionales.component.html",
  styleUrls: ["./new-profesionales.component.css"],
})
export class NewProfesionalesComponent implements OnInit {
  private image: any;
  verificaData: any;
  constructor(
    public profesionService: ProfesionalService,
    private toastr: ToastrService,
    private especialidadService: EspecialidadService,
    private restApiBack: RestApiBackendService
  ) {}
  EspecialidadList: Especialidad[];
  ngOnInit() {
    this.profesionService.getprofesion();
    this.resetForm();
    this.especialidadService.getEspecialidades().subscribe(snapshot => {
      this.EspecialidadList= snapshot.map(item=>{
         return {
           $key:item.payload.doc.id,
           ...item.payload.doc.data() as Especialidad
         } as  Especialidad;
       });
     });
    this.getDepartament();
  }
  handImage(event: any): void {
    this.image = event.target.files[0];
  }
  DataDepartaments: any;
  getDepartament() {
    this.DataDepartaments = Departamentos;
  }
  DataProvinces;
  listProvinces(code) {
    this.DataProvinces = [];
    let result = Province[0];
    this.DataProvinces = result[code];
  }
  DataDistricts;
  nameDistric;
  listDistricts(code) {
    this.DataDistricts = [];
    let result = District[0];
    this.DataDistricts = result[code];
    this.nameDistric = this.DataDepartaments;
  }
  dataClave;
  DataTempClave;
  onSubmit(especialidadForm: NgForm) {
    /*if (especialidadForm.value.$key == null)
    {
      this.profesionService.insertprofesion(especialidadForm.value);
      this.resetForm(especialidadForm);
      this.toastr.success('Successfull Operations','¡Hecho!, Alias registrado con exito');
    } else {
      this.profesionService.updatedprofesion(especialidadForm.value);
      this.resetForm(especialidadForm);
      this.toastr.success('Successfull Operations','¡Hecho!, Alias actualizado con exito');
    }*/
    this.toastr.warning("Iniciando el Registro");
    this.restApiBack.getClaveProfetional().subscribe((data) => {
      debugger;
      if (data.code == 400) {
        this.toastr.error(data.message);
      } else if (data.code == 200) {
        this.toastr.warning("Procesando grabación");
        this.DataTempClave = data.message;
        this.profesionService
          .preAddAndUpdatePost(
            especialidadForm.value,
            this.image,
            this.DataTempClave
          )
          .then((response) => {
            debugger
            if (response == 'true') {
              this.resetForm(especialidadForm);
              this.toastr.success(
                "Successfull Operations",
                "¡Hecho!, Profesional registrado con exito"
              );
            } else {
              this.resetForm(especialidadForm);
              this.toastr.warning("Hay algun  inconveniente que no pudimos completar el registro");
            }
          });
      } else {
        this.toastr.error("No se pudo procesar su petición");
      }
    });
  }
  resetForm(especialidadForm?: NgForm) {
    if (especialidadForm != null) {
      especialidadForm.reset();
      this.profesionService.selectedprofesion = new Profesional();
    }
  }
}
