import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { spell } from '../../spell'; // Certifique-se de que 'spell' está importado corretamente
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spells-list',
  standalone: true,  // Componente standalone
  imports: [CommonModule],
  templateUrl: './spells-list.component.html',
  styleUrls: ['./spells-list.component.css']
})
export class SpellsListComponent {
  private apiUrl = 'https://hp-api.onrender.com/api/spells';
  spells: spell[] = [];
  showSpells = false; // Controla a visibilidade da lista de feitiços

  constructor(private http: HttpClient) {
    this.getSpells().subscribe(dados => {
      this.spells = dados;
      console.log(dados);
    });
  }

  getSpells(): Observable<spell[]> {
    return this.http.get<spell[]>(this.apiUrl);
  }

  toggleSpells() {
    this.showSpells = !this.showSpells; // Alterna a visibilidade da lista
  }
}
