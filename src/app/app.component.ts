import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from './character'; // Certifique-se de que o Character está correto
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpellsListComponent } from './spells/spells-list/spells-list.component'; // Se você ainda usar o componente de Spells

@Component({
  selector: 'app-root',
  standalone: true,  // Componente standalone
  imports: [CommonModule, FormsModule, SpellsListComponent], // Módulos necessários
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'https://hp-api.onrender.com/api/characters';
  title = 'spa-harry-potter';
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {
    this.getCharacters().subscribe(dados => {
      this.characters = dados;
      this.filteredCharacters = []; // Inicialmente sem personagens exibidos
    });
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  // Função para realizar a pesquisa
  searchCharacter() {
    if (this.searchTerm.trim() === '') {
      this.filteredCharacters = []; // Não exibir nada se a pesquisa estiver vazia
      return; // Retorna sem fazer a busca
    }

    // Caso o termo de pesquisa seja uma letra (A-Z)
    if (this.searchTerm.length === 1 && /^[a-zA-Z]$/.test(this.searchTerm)) {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.charAt(0).toLowerCase() === this.searchTerm.toLowerCase()
      );
    } else {
      // Caso o termo de pesquisa seja um nome ou sobrenome
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        character.alternate_names.some(surname => surname.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }
}
