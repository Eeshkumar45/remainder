// self.addEventListener('install', (event)=>{
// console.log('install')
// });
self.addEventListener('sync', (event) => {
  // if (event.tag === 'notification-sync') {
    setInterval(async () => {
      sendNotification()
    }, 5000, 5000)
  // }
});

async function sendNotification() {
  // Create and display a notification
  console.log(111)

  const notification = await self.registration.showNotification('Hello, Notification!', {
    body: 'This is a notification from your app.',
  });
}
