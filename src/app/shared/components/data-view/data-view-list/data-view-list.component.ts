import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from "../../../api/users.api";
import { CommonModule } from "@angular/common";
import { UserListService } from "../../../../user-list/user-list.service";

@Component({
  selector: 'app-data-view-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './data-view-list.component.html',
  styleUrl: './data-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewListComponent {
  @Input() data!: UserDto[];

  constructor(private userListService: UserListService) {
  }

  delete(id: string) {
    this.userListService.removeUser(id);
  }
}
