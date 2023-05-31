import {Component} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {ClickChangeService} from 'src/app/services/click-change.service'
import {ClientsService} from 'src/app/services/clients.service'
import {DataService} from 'src/app/services/data.service'
import {ModalService} from 'src/app/services/modal.service'
import {NotificationService} from 'src/app/services/notification.service'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(public modalService: ModalService, private data: DataService, private clients: ClientsService, public clickDelete: ClickChangeService, private notification: NotificationService) {}

  form = new FormGroup({})

  submit() {
    this.data.deleteClient({
      id: this.clickDelete.element$[0].id,
      name: 'DELETE_USER_METHOD_RPOST_METHOD'
    }).subscribe(() => {
      this.modalService.closeDelete() // закрываем окно Удаление клиента
      this.modalService.openNotification() // Отдаем уведомление об успешном добавлении объекта
      this.notification.setTitle(`Вы успешно удалили пользователя под номером ${this.clickDelete.element$[0].id}`)
      setTimeout(() => this.modalService.closeNotification(), 3000) // Через 3 секунды закрываем уведомление
      // Отображаем актуальным список клиентов после, внесенных изменений
      this.data.getAll().subscribe((clients) => {
        this.clients.clients = clients
      })
    })
  }
}
