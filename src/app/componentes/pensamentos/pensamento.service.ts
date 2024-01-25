import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

//É um decorador Angular que torna a classe injetável em outros componentes ou serviços.
@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private API = 'http://localhost:3000/pensamentos'

  //Inseção de dependencia usando o construtor
  constructor(private http: HttpClient) { }

  //Observable é uma classe do  RXJS que fornece suporte para programação assíncrona.
  listar(pagina: number, filtro: string): Observable<Pensamento[]>{

    const itensPorPagina = 6;

    let params = new HttpParams()
    .set("_page", pagina)
    .set("_limit", itensPorPagina)

    //Trim remove os espações vazios dentro da string .
    if(filtro.trim().length > 2){
      params = params.set("conteudo", filtro)
    }
    //GET /posts _page=78 _limit=20
    // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`)

    return this.http.get<Pensamento[]>(this.API, { params: params })
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {    
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    // const url = `${this.API}/${pensamento.id}`
    // return this.http.put<Pensamento>(url, pensamento)
    return this.editar(pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }
}
