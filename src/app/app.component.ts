import { Component, OnInit } from '@angular/core';
import { Observable, of , range, generate , from, interval, timer, Subscribable, Subscription} from 'rxjs';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'remainder';
  timeInterval!:number;
  notification!:Observable<number>;
  notificationSubscription!:Subscription;

  ngOnInit(){
    setInterval(() => {
      console.log("start")
      this.sendNotification();
    }, 8000); // 1 minute interval
  }

  sendNotification() {
    if ('Notification' in window) {
      const notification = new Notification('My PWA Notification', {
        body: 'This is your PWA notification!',
      });

      notification.onclick = () => {
        // Handle notification click event here (e.g., navigate to a specific page)
        console.log('Notification clicked');
      };
    }
  }

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
