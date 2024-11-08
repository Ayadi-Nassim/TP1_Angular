import { Component } from '@angular/core';

@Component({
  selector: 'app-ttc',
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  price: number = 0; // Prix unitaire par défaut
  quantity: number = 1; // Quantité par défaut
  tva: number = 18; // TVA par défaut

  // Calcul du prix TTC
  get totalTTC(): number {
    let basePrice = this.price * this.quantity;
    let discount = 0;

    // Application des remises
    if (this.quantity >= 10 && this.quantity <= 15) {
      discount = 0.2; // Remise de 20%
    } else if (this.quantity > 15) {
      discount = 0.3; // Remise de 30%
    }

    const discountedPrice = basePrice * (1 - discount);
    return discountedPrice * (1 + this.tva / 100); // Ajout de la TVA
  }
}
