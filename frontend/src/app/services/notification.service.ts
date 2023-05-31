import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  title = ''
  // Изменяем Уведомление
  setTitle(title: string) {
    return this.title = title
  }
  // Отдаем Уведомление
  getTitle() {
    return this.title
  }
}
