import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {ModalService} from './modal.service'
import {IClient} from '../model/client'
import {ClientsService} from './clients.service'

@Injectable({
  providedIn: 'root'
})
export class ClickChangeService {
  constructor(private modalService: ModalService, private clients: ClientsService) { }

  elementClick$ = new Subject<string>()
  element$: IClient[] = []

  // Получаем id пользователя на которого произошел клик по кнопке Изменить
  changeButton($event: any): any {
    this.modalService.openChange() // открываем модальное окно Изменить
    this.elementClick$ = $event.srcElement.attributes[1].nodeValue // получаем id с кнопки
    this.element$ = this.clients.clients.filter((p: any) => this.elementClick$ == p.id) // вытаскиваем по id нужный объект
  }
  // Получаем id пользователя на которого произошел клик по кнопке Удалить
  deleteButton($event: any): any {
    this.modalService.openDelete() // открываем модальное окно Удалить
    this.elementClick$ = $event.srcElement.attributes[1].nodeValue // получаем id с кнопки
    this.element$ = this.clients.clients.filter((p: any) => this.elementClick$ == p.id) // вытаскиваем по id нужный объект
  }
}
