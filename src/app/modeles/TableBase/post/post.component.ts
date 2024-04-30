import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../shared/services/post.service";
import {RisqueService} from "../../../shared/services/risque.service";
import {AnalyseService} from "../../../shared/services/analyse.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Post} from "../../../Classes/Post/Post";
import {Risque} from "../../../Classes/RisqueAnalyse/risque";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";
import { AjouterPost } from 'src/app/Classes/Post/AjouterPost';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  posts!:Post[];
  getPostById!:Post;
  popupVisible = false;
  post!:AjouterPost;
  risque!:Risque[];
  AjouterPost=false;
  DettailePost=false;
  ModifierPost=false;
  idPost!:number;
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  submitButtonOption = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  constructor(private service:PostService,private risqueService:RisqueService,
              private analyseService:AnalyseService,private rout:Router,private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.post = {
      department: "",
      direction: "",
      fonction: '',
      idRisque:[],
      idAnalyse:[]


    }
  }
  changePopupeVisible(e: { row: { data: { idPost: number } } }){
    this.idPost = e.row.data.idPost;
    this.popupVisible=true
  }
  changeAjouterPost(){
    this.AjouterPost=true;
  }
  changeDettailePost(e: { row: { data: { idPost: number } } }){
    this.idPost = e.row.data.idPost;
    this.getpostById()
    this.DettailePost=true
  }
  annuler(){
    this.popupVisible=!this.popupVisible
  }
  getpostById(){
    this.service.getPostById(this.idPost).subscribe(response=>{
      this.getPostById=response
    },error => console.log(error))
  }
  public delete() {
    this.service.SuprimmerPost(this.idPost).subscribe(response => {
      this.getAllPost()
      this.notification.success("Post Suprimmer avec Succès.")
      this.popupVisible=false
    }, (errors) => {
      this.notification.info("Tu ne peux pas supprimer cet Post")
      console.log(errors)
    })
  }
  public getAllPost(){
    this.service.getAllPost().subscribe((response)=>{
      this.posts=response;
    },error => {console.log(error)})
  }
  onTreeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.post.idAnalyse = selectedValues;
  }
  TreeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.post.idRisque = selectedValues;
  }
  public getAllRisque(){
    this.risqueService.getAll().subscribe((response)=>{
      this.risque=response
    },(errors)=>{console.log(errors)})
  }
  public ajouter(e:Event){
    this.service.AjouterPost(this.post).subscribe((response)=>{
      response=this.post
      this.resetForm()
      this.notification.success("Analyse Medical Ajouter avec Succès")
      this.getAllPost()
      this.AjouterPost=false
    },error => {console.log(error)
      this.notification.info("Post existe.")
    })
  }
  ngOnInit(): void {
    this.getAllPost()
    this.getAllRisque()
  }

  Modifier($event: SubmitEvent) {
    this.service.modifierPost(this.post,this.idPost).subscribe(reponse=>{
      this.post=reponse
      this.resetForm()
      this.getAllPost()
      this.notification.success("Post Modifier avec Succès")
      this.ModifierPost=false
    },error => {console.log(error)
      this.notification.info('Post existe.')})
  }

  chaneModifierPost(e: { row: { data: { idPost: number } } }){
    this.idPost = e.row.data.idPost;
    this.getpostById()
    this.ModifierPost=true
  }

  anullerModiefierPost() {
    this.ModifierPost=false
  }
  anullerAjouterPost(){
    this.AjouterPost=false
  }
  annullerDettailePost(){
    this.DettailePost=false
  }
}
