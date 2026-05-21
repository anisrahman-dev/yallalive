// Firebase Analytics — auto-tracks page_view on every page load.
// Loaded as type="module" from each user-facing HTML page.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBESvZatDMFpY36TwoJZ-n5HIYjFfvtztA',
  authDomain: 'yallalivefootball.firebaseapp.com',
  projectId: 'yallalivefootball',
  storageBucket: 'yallalivefootball.firebasestorage.app',
  messagingSenderId: '84123991975',
  appId: '1:84123991975:web:9146b55b2749f7680e0082',
  measurementId: 'G-C43EHN4M3M'
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
