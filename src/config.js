export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APT_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51QPrbREUxK0KeTaf1Idf2eUpC02wN0ZhdgByEQgQQRT1j3NwCZnBRNKCrFHk6rPZMFnEPYwPMjuH9gSi0Hl1oFRa00CYE99SaR'

export const backendApi = 'http://localhost:8080'
