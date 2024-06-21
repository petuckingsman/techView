import { Injectable } from '@angular/core';
import { ListRequest, UsersApi } from "../shared/api/users.api";
import { BehaviorSubject, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  userList$ = new BehaviorSubject<null>(null);
  userListLoader$ = new BehaviorSubject<boolean>(true);
  userListLoaderObs$ = this.userListLoader$.asObservable();

  constructor(private usersApi: UsersApi) {
  }

  getUserList = (params: ListRequest) => {
    this.userListLoader$.next(true);
    return this.userList$.asObservable().pipe(
      switchMap(() => {
        return this.usersApi.getList(params).pipe(
          tap(() => {
            this.userListLoader$.next(false);
          })
        );
      })
    );
  }

  removeUser(id: string) {
    this.userListLoader$.next(true);
    this.usersApi.remove(id).pipe(tap(() => this.userList$.next(null))).subscribe();
  }
}
