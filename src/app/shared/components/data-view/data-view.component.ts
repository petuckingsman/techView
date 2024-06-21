import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { DataViewLayout } from "./data-view-layout";
import { CommonModule  } from "@angular/common";
import { DataViewListComponent } from "./data-view-list/data-view-list.component";
import { DataViewCardComponent } from "./data-view-card/data-view-card.component";
import { ListRequest, UserListResponseDto } from "../../api/users.api";
import { ExecuteWithPipe } from "../../pipes/execute-with.pipe";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, ReplaySubject, takeUntil } from "rxjs";

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    SearchComponent,
    CommonModule,
    DataViewListComponent,
    DataViewCardComponent,
    ExecuteWithPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewComponent implements OnInit, OnDestroy {
  @Input() data!: UserListResponseDto | null;
  @Output() paramsChange = new EventEmitter();

  destroy$ = new ReplaySubject(1);


  protected readonly DataViewLayout = DataViewLayout;

  layoutConfig: DataViewLayout[] = [
    DataViewLayout.List,
    DataViewLayout.Card
  ];

  layout: DataViewLayout = DataViewLayout.List;

  optionsPerPage = [5, 10, 20];

  form = this.fb.group({
    itemsPerPage: 5,
    search: '',
    pageNumber: 1,
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe(value => {
      this.paramsChange.emit(value)
    })
  }


  getPages = (total: number, option: number) => {
    const totalPages = Math.ceil(total / option);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
