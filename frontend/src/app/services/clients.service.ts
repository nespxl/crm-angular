import {Injectable} from '@angular/core'
import {IClient} from '../model/client'

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  // Храним полученных пользователей, которые пришли с сервера
  clients: IClient[] = []
}
