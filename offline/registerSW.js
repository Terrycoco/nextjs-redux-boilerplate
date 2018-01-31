export default async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration('/');
      if (!registration) {
        await navigator.serviceWorker.register('/my-service-worker.js', {
          scope: '/'
        });

        console.log(`Registration successful`);
      }

    } catch (e) {
      console.warn(`Registration failed: ${e.message}`);
    }
  }
}