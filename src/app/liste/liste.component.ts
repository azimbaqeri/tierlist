import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare type Categorie = {
  nom: string,
  elements: string[]
  estModifi: boolean
}
@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {



  categories: Categorie[] = [];


  urlSaisie: string = "";
  categoryListe: number = 0;
  nomCategorieSaisie: string = "";
  estModifi: boolean = false;

  onAjoutCategorie() {
    if(this.nomCategorieSaisie != "") {
      this.categories.push({
        nom: this.nomCategorieSaisie,
        elements: [],
        estModifi: false
      });
    }
    this.nomCategorieSaisie = "";
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  onSupprimerCategorie(categoriesASupprimer: Categorie, indexCategorie: number) {

    const categoriesRemplace = 
    indexCategorie <1
    ? this.categories[indexCategorie + 1]
    : this.categories[indexCategorie - 1];

    // on ajoute les elements
    categoriesRemplace.elements = [...categoriesRemplace.elements, ...categoriesASupprimer.elements ];


    // on suprime la categorie
    this.categories.splice(indexCategorie, 1);
    // const index = this.categories.indexOf(categories);
    // this.categories.splice(index, 1);
    
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  ngOnInit() {
    const categoriesEnregistre = localStorage.getItem("categories");

    //si il n'y a pas de categories enregistre : on les enregistre
    if (categoriesEnregistre == null) {
      this.initialiseCategories();

    } else {
      this.categories = JSON.parse(categoriesEnregistre);
    }

  }

  initialiseCategories() {
    this.categories = [
      { nom: "Top", elements: [] ,estModifi: false },
      { nom: "Bien", elements: [] ,estModifi: false },
      { nom: "Bof", elements: [] ,estModifi: false },
      { nom: "Null", elements: [] ,estModifi: false },
      { nom: "Horrible", elements: [], estModifi: false }
    ];
  }
  resetCategories() {
    this.initialiseCategories();
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  onDoubleClickCategorie(categorieDoubleClick: Categorie, evenement: any) {

      this.categories.forEach(categorie=>{
        categorie.estModifi = false
      })

    categorieDoubleClick.estModifi = true;

    const element = evenement.target;

    if (element != null) {

      const enTete = element.closest(".entete");
      const input = enTete.querySelector("input");
      console.log(input);

      input.focus();
      

    }

  }

  onBlurCategorie(categorie: Categorie) {
    categorie.estModifi = false;
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  onKeyupCategorie(categorie: Categorie, event: KeyboardEvent) {
    if(event.code == "Enter") {
      this.onBlurCategorie(categorie);
    }
  }

  onAjoutElement() {
    if (this.urlSaisie != "") {
      //on ajoute l'element a la liste d'element de la premiere des categories
      this.categories[this.categoryListe].elements.push(this.urlSaisie);
      this.urlSaisie = "";
      localStorage.setItem("categories", JSON.stringify(this.categories));

    }

  }

  onSupprimerElement(category: Categorie, index: number) {
    category.elements.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  onchangeCategorie(
    indexCategorie: number,
    indexElement: number,
    monte : boolean
  ) {

    const element = this.categories[indexCategorie].elements[indexElement];

    this.categories[indexCategorie].elements.splice(indexElement, 1);
    
    this.categories[indexCategorie + (monte ? 1 : -1)].elements.push(element);

    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  

}
