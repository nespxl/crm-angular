import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ClickChangeService} from 'src/app/services/click-change.service'
import {ClientsService} from 'src/app/services/clients.service'
import {DataService} from 'src/app/services/data.service'
import {ModalService} from 'src/app/services/modal.service'
import {NotificationService} from 'src/app/services/notification.service'

@Component({
  selector: 'app-change-modal',
  templateUrl: './change-modal.component.html',
  styleUrls: ['./change-modal.component.css']
})
export class ChangeModalComponent implements OnInit {
  constructor(public modalService: ModalService, public clickChange: ClickChangeService, public data: DataService, private clients: ClientsService, private notification: NotificationService) { }

  // Валидация формы 
  form = new FormGroup({
    name: new FormControl<string>(this.clickChange.element$[0]?.name, [
      Validators.required,
      Validators.maxLength(15)
    ]),
    surname: new FormControl<string>(this.clickChange.element$[0]?.surname, [
      Validators.required,
      Validators.maxLength(15)
    ]),
    lastname: new FormControl<string>(this.clickChange.element$[0]?.lastname, [
      Validators.required,
      Validators.maxLength(15)
    ])
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

  ngOnInit(): void { }

  // Отправка формы
  submit() {
    // Проверяем на существование полей
    if (this.form.value.surname && this.form.value.lastname) {
      // Условие при котором форма будет отправлена на сервер
      if (this.form.value.name !== '' && this.form.value.surname.length < 17 && this.form.value.lastname?.length < 17) {
        this.data.put({
          id: String(this.clickChange.elementClick$) as string,
          name: this.form.value.name as string,
          surname: this.form.value.surname as string,
          lastname: this.form.value.lastname as string,
        }).subscribe(() => {
          this.modalService.closeChange() // закрываем окно Изменения
          this.modalService.openNotification() // Отдаем уведомление об успешном изменении объекта
          this.notification.setTitle(`Вы успешно изменили пользователя под номером ${this.clickChange.elementClick$}`)
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
