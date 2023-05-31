import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {IClient, IClientDelete, IUser} from '../model/client'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  // Получаем всех пользователей для таблицы
  getAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>('http://127.0.0.1:3000/api/clients')
  }
  // Создаем пользователя длля таблицы
  create(client: IClient): Observable<IClient> {
    return this.http.post<IClient>('http://127.0.0.1:3000/api/clients', client)
  }
  // Изменяем пользователя для таблицы
  put(client: IClient): Observable<IClient> {
    return this.http.put<IClient>('http://127.0.0.1:3000/api/clients', client)
  }
  // Удаляем пользователя из таблицы
  deleteClient(client: IClientDelete): Observable<number> {
    return this.http.post<number>(`http://127.0.0.1:3000/api/clients`, client)
  }

  // Создаем юзера для входа в crm
  createUsers(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://127.0.0.1:3000/api/users', user)
  }
  // В форме авторизации вытаскиваем и проверяем нужного нам пользователя
  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://127.0.0.1:3000/api/users')
  }
}
