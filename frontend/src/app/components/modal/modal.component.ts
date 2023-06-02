import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {DataService} from 'src/app/services/data.service'
import {LastItemService} from 'src/app/services/last-item.service'
import {ModalService} from 'src/app/services/modal.service'
import {ClientsService} from 'src/app/services/clients.service'
import {NotificationService} from 'src/app/services/notification.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService, private data: DataService, private lastItem: LastItemService, private clients: ClientsService, private notification: NotificationService) {}

  // Валидация формы 
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(16)
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(16)
    ]),
    lastname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(16)
    ]),
  })

  // Для проверки полей после взаимодействия с пользователем
  get name() {
    return this.form.controls.name as FormControl
  }
  get surname() {
    return this.form.controls.surname as FormControl
  }
  get lastname() {
    return this.form.controls.lastname as FormControl
  }

  ngOnInit(): void {}

  submit() {
    // Проверяем на существование полей
    if(this.form.value.surname && this.form.value.lastname?.length) {
      // Условие при котором форма будет отправлена на сервер
      if(this.form.value.name !== '' && this.form.value.surname.length < 17 && this.form.value.lastname?.length < 17) {
        this.data.create({
          id: String(Number(this.lastItem.lastClient) + 1) as string,
          name: this.form.value.name as string,
          surname: this.form.value.surname as string,
          lastname: this.form.value.lastname as string,
        }).subscribe(() => {
          this.modalService.close() // закрываем окно Добавления клиента
          this.modalService.openNotification() // Отдаем уведомление об успешном добавлении объекта
          this.notification.setTitle('Вы успешно добавили пользователя')
          setTimeout(() => this.modalService.closeNotification(), 3000) // Через 3 секунды закрываем уведомление
          // Отображаем актуальным список клиентов после, внесенных изменений
          this.data.getAll().subscribe((clients) => {
            this.clients.clients = clients
          })
        })
      }
    }
  }
}
