import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LastItemService {

  constructor() { }
  // Для присваивания id к клиенту/юзеру
  lastClient = ''
  lastUser = ''
}
