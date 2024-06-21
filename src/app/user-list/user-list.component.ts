import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataViewComponent } from "../shared/components/data-view/data-view.component";
import { UserListService } from "./user-list.service";
import { ExecuteWithPipe } from "../shared/pipes/execute-with.pipe";
import { AsyncPipe, CommonModule, JsonPipe } from "@angular/common";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, DataViewComponent, ExecuteWithPipe, AsyncPipe, JsonPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  params = {
    pageNumber: 1,
    search: '',
    itemsPerPage: 5,
  }
  constructor(public userListService: UserListService) {
  }

}
