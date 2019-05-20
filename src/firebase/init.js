import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyAXAHqT7DuHnJRWay3nZgvwJDh-ajVNwpE',
  authDomain: 'an-gi-603be.firebaseapp.com',
  databaseURL: 'https://an-gi-603be.firebaseio.com',
  projectId: 'an-gi-603be',
  storageBucket: 'an-gi-603be.appspot.com',
  messagingSenderId: '405003650947'
}

firebase.initializeApp(config)
