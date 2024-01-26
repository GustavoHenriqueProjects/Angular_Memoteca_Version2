import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listarPensamentos: Pensamento[] = [];

  haMaisPensamentos: boolean = true;

  filtro: string = ' '

  favoritos: boolean = false

  paginaAtual: number = 1;

  listaFavoritos: Pensamento[] = []

  //Para não recarregar toda a página use router
  constructor(
    private service: PensamentoService,
    private router: Router
    ) { }

  /*ngOnInit faz parte do ciclo de vida do componente, toda lógica que deve ser executada
    junto com o componente deve ficar dentro do ngOnInit.
    
    Com o subscribe o observable sabe que presisa enviar notificações para o componente.
  */ 
  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos = false).subscribe((listaPensamentos) => {
      this.listarPensamentos = listaPensamentos
    })
  }  

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos = false)
    .subscribe(listarPensamentos => {
      this.listarPensamentos.push(...listarPensamentos)
      if(this.listarPensamentos.map(it => Number(it.id) === 10)){        
        this.haMaisPensamentos = false;
      }
    })
  }

  //Para não recarregar a pagina inteira utilize essa tecnica .
  recarregarComponente(){
    this.favoritos = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }


  pesquisarPensamentos(){

    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos = false)
    .subscribe((listaPensamentos) =>{
      this.listarPensamentos = listaPensamentos
    })
  }

  listarFavoritos(){
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe((listaPensamentosFavoritos) => {      
      this.listarPensamentos = listaPensamentosFavoritos
      this.listaFavoritos = listaPensamentosFavoritos
    })
  }
}
