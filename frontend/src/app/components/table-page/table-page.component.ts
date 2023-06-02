import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {ModalService} from 'src/app/services/modal.service'

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {
  constructor(public modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    // Проверяем на токен входа, в случае отсутствия закрываем вход на страницу
    if(localStorage.getItem('userCrmSystemAngular') === null) {
      this.router.navigate(['/register'])
    }
  }
}
