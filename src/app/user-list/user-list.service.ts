import { Injectable } from '@angular/core';
import { ListRequest, UsersApi } from "../shared/api/users.api";
import { BehaviorSubject, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  userList$ = new BehaviorSubject<null>(null);

  constructor(private usersApi: UsersApi) {
  }

  getUserList = (params: ListRequest) => {
    return this.userList$.asObservable().pipe(
      switchMap(() => {
        return this.usersApi.getList(params)
      })
    );
  }

  removeUser(id: string) {
    this.usersApi.remove(id).pipe(tap(() => this.userList$.next(null))).subscribe();
  }
}
