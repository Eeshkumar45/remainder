import { Component } from '@angular/core';
import { Observable, of , range, generate , from, interval, timer, Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'remainder';
  timeInterval!:number;
  notification!:Observable<number>;
  notificationSubscription!:Subscription;

  requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification('Permission granted');
          });
        }
      });
    } else {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification('Permission granted');
      });
    }
  }

  startNotification(){
    this.notification = interval(this.timeInterval);
    this.notificationSubscription = this.notification.subscribe((d)=>{
      console.log(d)
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification('Notification');
      });
    });
  }

  stopNotification(){
    this.notificationSubscription.unsubscribe();
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
