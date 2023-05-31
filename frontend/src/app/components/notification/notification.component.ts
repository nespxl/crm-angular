import {Component} from '@angular/core'
import {ModalService} from 'src/app/services/modal.service'
import {NotificationService} from 'src/app/services/notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService, public modalService: ModalService) {}
}
