import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: 'input[appRainbowWriting]', // Limite l’application de la directive aux <input>
})
export class RainbowWritingDirective {
  // Définir les couleurs arc-en-ciel
  private colors = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#8B00FF',
  ];

  // Utiliser HostBinding pour lier dynamiquement les styles de couleur et de bordure
  @HostBinding('style.color') textColor: string = '';
  @HostBinding('style.borderColor') borderColor: string = '';

  constructor(private el: ElementRef) {}

  // Changer la couleur à chaque événement keyup
  @HostListener('keyup') onKeyUp() {
    const randomColor = this.getRandomColor();
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }

  // Fonction pour choisir une couleur aléatoire
  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}
