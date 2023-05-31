import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'changeModal'
})
export class ChangePipe implements PipeTransform {

  // Получаем id пользователя на которого произошел клик
  transform(items: any, elem: any): unknown {
    return items.filter((p: any) => p.id.includes(elem.id))
  }
}
