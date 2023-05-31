import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'filtered'
})
export class FilteredPipe implements PipeTransform {

  // фильтруем по строке поиска Пользователей в таблице
  transform(items: any, search: any): any {
    return items.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()) || p.surname.toLowerCase().includes(search.toLowerCase()) || p.lastname.toLowerCase().includes(search.toLowerCase()))
  }
}
