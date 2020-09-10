import { Component, OnInit } from '@angular/core';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { Router } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema []

  constructor(
    private temaService: TemaService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    this.findAllTemas()
  }

  findAllTemas () {
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })

  }
  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) =>{
      this.tema= resp;
    })
  }
  cadastrar(){
    if( this.tema.descricao == null ){
      this.alert.showAlertInfo('Preencha o campo de nome do tema corretamente')

    }else{
      this.temaService.postTema( this.tema).subscribe((resp: Tema) =>{
        this.tema= resp
        this.router.navigate(['/feed'])
        this.alert.showAlertSuccess('Tema Cadastrado com sucesso!')
      })
    }

  }

}
