import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text?: string;
  @Input() bgColor: string = 'primary';
  @Input() size: string = 'medium';
  @Input() round: boolean = false;
  @Input() type: string = '';
  @Input() isDisable: boolean = false;
  @Input() color?: string;
  @Input() icon?: string;
 
  className: Object = {};

  constructor() { }

  ngOnInit(): void {
    this.className = {
      'btn': true,
      'btn-primary': this.bgColor === 'primary',
      'danger': this.bgColor === 'danger',
      'full': this.size === 'full',
      'medium': this.size === 'medium',
      'round': this.round
    };
  }
}
