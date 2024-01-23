import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listarPensamentos: Pensamento[] = [];

  haMaisPensamentos: boolean = true;

  paginaAtual: number = 1;

  constructor(private service: PensamentoService) { }

  /*ngOnInit faz parte do ciclo de vida do componente, toda lógica que deve ser executada
    junto com o componente deve ficar dentro do ngOnInit.
    
    Com o subscribe o observable sabe que presisa enviar notificações para o componente.
  */ 
  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listarPensamentos = listaPensamentos
    })
  }  

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual)
    .subscribe(listarPensamentos => {
      this.listarPensamentos.push(...listarPensamentos)
      if(this.listarPensamentos.map(it => Number(it.id) === 10)){        
        this.haMaisPensamentos = false;
      }
    })
  }
}
