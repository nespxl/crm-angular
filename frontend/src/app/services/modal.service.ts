import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  isVisible$ = new BehaviorSubject<boolean>(false)
  isVisibleChange$ = new BehaviorSubject<boolean>(false)
  isVisibleDelete$ = new BehaviorSubject<boolean>(false)
  isVisibleNotification$ = new BehaviorSubject<boolean>(false)

  // Открываем форму Добавления
  open() {
    this.isVisible$.next(true)
  }
  // Закрываем форму Добавления
  close() {
    this.isVisible$.next(false)
  }

  // Открываем форму Изменения
  openChange() {
    this.isVisibleChange$.next(true)
  }
  // Закрываем форму Изменения
  closeChange() {
    this.isVisibleChange$.next(false)
  }

  // Открываем форму Удаления
  openDelete() {
    this.isVisibleDelete$.next(true)
  }
  // Закрываем форму Удаления
  closeDelete() {
    this.isVisibleDelete$.next(false)
  }

  // Открываем Уведомления
  openNotification() {
    this.isVisibleNotification$.next(true)
  }
  // Закрываем Уведомления
  closeNotification() {
    this.isVisibleNotification$.next(false)
  }
}
