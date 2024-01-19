import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  // listarPensamentos: Pensamento[] = [
  //   {
  //     conteudo: 'Passa as informações para o componente filho',
  //     autoria: 'Componente Pai',
  //     modelo: 'modelo3'
  //   },
  //   {
  //     conteudo: 'Minha propriedade é decorada com @input()',
  //     autoria: 'Componente Filho',
  //     modelo: 'modelo1'
  //   },
  //   {
  //     conteudo: ' ciclo da água na Terra, também conhecido como ciclo hidrológico, envolve uma série de processos interligados. A água evapora dos oceanos, lagos e rios devido ao calor solar, formando vapor de água na atmosfera. Esse vapor se condensa para criar nuvens. Quando as nuvens atingem um ponto de saturação, ocorre a precipitação na forma de chuva, neve ou granizo. A água que cai retorna à superfície terrestre, onde pode ser absorvida pelo solo, infiltrar-se nos lençóis freáticos ou escoar superficialmente para rios e oceanos. O ciclo continua com a evaporação, completando assim o processo contínuo de renovação da água na Terra, vital para sustentar a vida e manter o equilíbrio ambiental.',
  //     autoria: 'Pensamento 256 caracteres',
  //     modelo: 'modelo2'
  //   }
  // ]

  listarPensamentos: Pensamento[] = [
    
  ]  

  constructor(private service: PensamentoService) { }

  /*ngOnInit faz parte do ciclo de vida do componente, toda lógica que deve ser executada
    junto com o componente deve ficar dentro do ngOnInit.
    
    Com o subscribe o observable sabe que presisa enviar notificações para o componente.
  */ 
  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listarPensamentos = listaPensamentos
    })
  }  
}
