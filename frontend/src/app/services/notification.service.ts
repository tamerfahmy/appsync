import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private life = 3000;

  constructor(private messageService: MessageService) { }

  /**
   * Shows error
   * @param title the title
   * @param error the error
   */
  showError(title: string, error: string) {
    this.messageService.add({ severity: 'is-error', summary: title, detail: error, life: this.life });
  }

  /**
   * Shows info
   * @param title the title
   * @param info the info message
   */
  showInfo(title: string, info: string) {
    this.messageService.add({ severity: 'is-informative', summary: title, detail: info, life: this.life });
  }

  /**
   * Shows warning
   * @param title the title
   * @param warning the warning message
   */
  showWarning(title: string, warning: string) {
    this.messageService.add({ severity: 'is-warning', summary: title, detail: warning, life: this.life });
  }

  /**
   * Shows success
   * @param title the title
   * @param message the message
   */
  showSuccess(title: string, message: string) {
    this.messageService.add({ severity: 'is-success', summary: title, detail: message, life: this.life });
  }
}
