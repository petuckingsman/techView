import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from "../../../api/users.api";
import { UserListService } from "../../../../user-list/user-list.service";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-data-view-card',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './data-view-card.component.html',
  styleUrl: './data-view-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewCardComponent {
  @Input() data!: UserDto[];

  constructor(private userListService: UserListService) {
  }

  delete(id: string) {
    this.userListService.removeUser(id);
  }
}
