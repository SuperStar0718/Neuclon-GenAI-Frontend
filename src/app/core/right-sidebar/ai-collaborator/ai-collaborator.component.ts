import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ai-collaborator',
  templateUrl: './ai-collaborator.component.html',
  styleUrls: ['./ai-collaborator.component.scss'],
})
export class AICollaboratorComponent {
  defaultSelectedOption: string = 'insight';
}
