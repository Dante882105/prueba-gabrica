import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetIpService } from '../../services/get-ip.service';
//Importación de sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  //Se declaran las variables a usar
  public formulario!: FormGroup;
  public ipClient!: string;
  public hour!: string;
  public date!: string;

  constructor(
    private fb: FormBuilder, //Se genera el formulario reactivo con FormBuilder
    public _getIp: GetIpService //se integra el servicio para obtener la ipr del cliente
  ){};

  ngOnInit(): void {
    //Se crea la constante para la fecha
    const fecha = new Date();
    this.hour = fecha.toLocaleTimeString('es-CO'); //Se captura hora en Colombia
    this.date = fecha.toLocaleDateString('es-CO');//Se captura la fecha en Colombia
    //Se genera el servicio y su subscripción para obtener la IP del cliente
    this._getIp.IpClient().subscribe({
      next: ((response)=>{
        this.ipClient = response.ip;
        console.log(response, this.ipClient);
      }),
      error: ((err)=>{
        console.error(err)
      })
    });
    //Se inicializa el formulario con los campos a traer
    this.formulario = this.initForm();

    //console.log(this.formulario)
  };

//geters de validación de campos formulario
  get nombreClienteValidator(){
    return this.formulario.get('nombre_cliente')?.invalid && this.formulario.get('nombre_cliente')?.touched;
  };

  get nitValidator(){
    return this.formulario.get('nit')?.invalid && this.formulario.get('nit')?.touched;
  };

  get nombrePuntoValidator(){
    return this.formulario.get('nombre_punto')?.invalid && this.formulario.get('nombre_punto')?.touched;
  };

  get nombreEquipoValidator(){
    return this.formulario.get('nombre_equipo')?.invalid && this.formulario.get('nombre_equipo')?.touched;
  };

  get ciudadValidator(){
    return this.formulario.get('ciudad')?.invalid && this.formulario.get('ciudad')?.touched;
  };

  get promotorValidator(){
    return this.formulario.get('promotor')?.invalid && this.formulario.get('promotor')?.touched;
  };

  get rtcValidator(){
    return this.formulario.get('rtc')?.invalid && this.formulario.get('rtc')?.touched;
  };

  get capitanUsuarioValidator(){
    return this.formulario.get('capitan_usuario')?.invalid && this.formulario.get('capitan_usuario')?.touched;
  };

  get tratamientoDatosValidator(){
    return this.formulario.get('tratamiento_datos')?.invalid && this.formulario.get('tratamiento_datos')?.touched;
  };
  //captura de los campos del formulario reactivo y sus respectivas validaciones
  initForm(): FormGroup{
    return this.fb.group({
      nombre_cliente:['',[Validators.required, Validators.pattern(/[a-zA-ZñÑ´]$/)]],
      nit:['', [Validators.required]],
      nombre_punto: ['', Validators.pattern(/^[^#¿?,]*$/)],
      nombre_equipo: ['', Validators.pattern(/^[^#¿?,]*$/)],
      ciudad: ['', Validators.required],
      promotor: ['', Validators.pattern(/^[^#¿?,]*$/)],
      rtc: ['',[Validators.pattern(/[0-9]$/)]],
      capitan_usuario: ['', Validators.pattern(/^[^#¿?,A-Z]*$/)],
      tratamiento_datos: [false, [Validators.required]],
      ip: [this.ipClient],
      date: [this.date],
      hour: [this.hour]
    });
  };

  //Evento al enviar el formulario con submit
  enviar_info(){
    if(this.formulario.valid){ //Formiulario válido
      this.correctForm()
    }else{ //Formulario no valido
      this.errorForm();
    }
  };

  //Modal para el caso en el que el formulario no fue correctamente diligenciado
  errorForm() {
    Swal.fire({
      title: '¡Error!',
      text: '¡Uno o más campos del formulario no ha sido diligenciado correctamente! Por favor verifica la información brindada.',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  };

  //Modal para el caso en el que el formulario fue correctamente diligenciado
  correctForm(){
    Swal.fire({
      title: "¡Información enviada correctamente! Gracias por tu inscripción",
      icon: "success",
      draggable: true,
      confirmButtonText: 'Cerrar'
    });
  };

};