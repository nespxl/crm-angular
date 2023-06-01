import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DataService } from 'src/app/services/data.service'
import { LastItemService } from 'src/app/services/last-item.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private data: DataService,
    private lastItem: LastItemService,
    private router: Router
  ) {}
  coincidence = false
  reAuth = false

  // Валидация формы
  form = new FormGroup({
    mail: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    repassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
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
  get repassword() {
    return this.form.controls.repassword as FormControl
  }

  submit() {
    let flagAuth = false
    // Проверяем на наличии в бд почты, если она есть: выкидываем ошибку
    this.data.getUser().subscribe((users) => {
      const user = users.filter((p) => p.name === this.form.value.mail)
      if (user.length === 1 && this.form.value.password === user[0].password) {
        // и перенаправляем к таблице
        flagAuth = true
      }
    })
    // Флаг, отвечающий за почту(есть ли она в бд или нет)
    if (flagAuth) {
      // Проверяем входные данные
      if (
        this.form.value.password === this.form.value.repassword &&
        this.form.value.password !== '' &&
        this.form.controls.mail
      ) {
        this.coincidence = false
        // Если все успешно перенаправляем пользователя к таблице
        this.router.navigate(['/entry'])
        // Отдаем на сервер созданного юзера
        this.data
          .createUsers({
            id: String(Number(this.lastItem.lastUser) + 1) as string,
            name: this.form.value.mail as string,
            password: this.form.value.password as string,
          })
          .subscribe((user) => {
            // Очищаем форму после отправки
            this.form.reset()
          })
      } else {
        // При ошибки показываем уведомление
        this.coincidence = true
      }
    } else {
      console.log('такой аккаунт уже есть')
      this.reAuth = true
    }
  }
}
