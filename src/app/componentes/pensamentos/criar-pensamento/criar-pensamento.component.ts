import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  //Form group faz parte da contrução dos formularios.
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,

    //Form builder faz parte da contrução do formulario
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //Deve ter os atributos que vão constar no formulario
    //É responsavel por inicializar os dados no componente
    this.formulario = this.formBuilder.group({
      // conteudo: ['', [Validators.required]],
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)  // Não permite espações vazios
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])], 
      modelo: ['modelo1'],
    });
  }

  criarPensamento() {
    
    //If o formulario for valido o pensamento é criado .
    if (this.formulario.valid) {
        this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
