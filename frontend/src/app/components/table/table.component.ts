import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {ClickChangeService} from 'src/app/services/click-change.service'
import {ClientsService} from 'src/app/services/clients.service'
import {DataService} from 'src/app/services/data.service'
import {LastItemService} from 'src/app/services/last-item.service'
import {ModalService} from 'src/app/services/modal.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(public clickChange: ClickChangeService, private data: DataService, private lastItem: LastItemService, public clients: ClientsService, public modalService: ModalService, private router: Router) {}
  // Строка поиска
  search = ''
  change = 0
  // Лоадер
  loading = false

  ngOnInit(): void {
    this.loading = true
    setTimeout(() => this.modalService.closeNotification(), 3000);
    // Запрос на всех созданных пользователей
    this.data.getAll().subscribe((clients) => {
      this.loading = false
      this.clients.clients = clients
      this.lastItem.lastClient = clients[clients.length - 1].id
    })
    // Проверяем на токен входа, в случае отсутствия закрываем вход на страницу
    if(localStorage.getItem('userCrmSystemAngular') === null) {
      this.router.navigate(['/register'])
    }
  }

  // Кнопка Выход, удаляем токен и перенаправляем к форме регистрации
  out() {
    localStorage.removeItem('userCrmSystemAngular')
    this.router.navigate(['/register'])
  }
}
