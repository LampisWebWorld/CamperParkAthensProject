import { Component, Input } from '@angular/core';
import { User } from '../../shared/interfaces/mongo-backend';

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  @Input() user: User | undefined
}
