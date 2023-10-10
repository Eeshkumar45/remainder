// self.addEventListener('install', (event)=>{
// console.log('install')
// });
self.addEventListener('sync', (event) => {
  // if (event.tag === 'notification-sync') {
    // setInterval(async () => {
    //   sendNotification()
    // }, 5000, 5000)
  // }
});

// async function sendNotification() {
  // Create and display a notification
  console.log(111)
  self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'displayNotification') {
      // Handle the message and create a notification
      const notificationOptions = {
        body: 'This is a notification from your service worker.',
        icon: 'path-to-your-icon.png', // Change to your notification icon
      };
      setInterval(()=>self.registration.showNotification('Notification from Service Worker', notificationOptions),5000)

    }
  });
// }
