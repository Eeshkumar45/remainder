import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'remainder';

  requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.showNotification('Notification Title', 'Notification Body');
        }
      });
    } else {
      this.showNotification('Notification Title', 'Notification Body');
    }
  }

  // Function to display a notification
  showNotification(title: string, body: string) {
    const notification = new Notification(title, {
      body: body,
    });
  }

  fun() {
    navigator.serviceWorker.register('sw.js');
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification('Notification with ServiceWorker');
        });
      }
    });
  }
}
