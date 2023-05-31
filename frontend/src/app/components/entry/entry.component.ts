import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from 'src/app/services/data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {}

  // Валидация формы
  form = new FormGroup({
    mail: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(8),
    ]),
  })

  ngOnInit(): void {
    // Если ключ входа уже есть, то перенапрявлем юзера к таблице
    if (
      localStorage.getItem('userCrmSystemAngular') === 'userCrmSystemAngular'
    ) {
      this.router.navigate(['crm'])
    }
  }

  // Для проверки полей после взаимодействия с пользователем
  get name() {
    return this.form.controls.mail as FormControl
  }
  get password() {
    return this.form.controls.password as FormControl
  }

  submit() {
    this.data.getUser().subscribe((users) => {
      // Добавляем ключ в localStorage при успешной авторизации
      localStorage.setItem('userCrmSystemAngular', 'userCrmSystemAngular')
      const user = users.filter((p) => p.name === this.form.value.mail)
      if (user.length === 1 && this.form.value.password === user[0].password) {
        // и перенаправляем к таблице
        this.router.navigate(['crm'])
      }
    })
  }
}
