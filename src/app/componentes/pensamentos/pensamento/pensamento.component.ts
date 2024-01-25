import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  //Recebe as informações do componente Pai 
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular !!',
    autoria: 'Fernanda Regina',
    modelo: 'modelo3',
    favorito: false
  }

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    console.log("O pensamento é: ",  this.pensamento);

  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }else{
      return 'pensamento-p'
    }
  }

  mudarIconeFavorito():string{
    if(this.pensamento.favorito == false){
      return 'inativo'
    }else{
      return 'ativo'
    }
  }

  atualizarFavoritos(){
    console.log("O pensamento é: ",  this.pensamento);
    
    this.service.mudarFavorito(this.pensamento).subscribe()
  }

}
