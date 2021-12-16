import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const clientCredentials = {
    apiKey: 'AIzaSyDsmSQJj8u4SQlA6sOZ1SYXtpGfNPyxATE',
    authDomain: 'memory-39745.firebaseapp.com',
    projectId: 'memory-39745',
    storageBucket: 'memory-39745.appspot.com',
    messagingSenderId: '1012912929618',
    appId: '1:1012912929618:web:997f6812cbc27c5bd1988b',
}

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(clientCredentials)
        // Check that `window` is in scope for the analytics module!
        if (typeof window !== 'undefined') {
            // Enable analytics. https://firebase.google.com/docs/analytics/get-started
            if ('measurementId' in clientCredentials) {
                firebase.analytics()
                firebase.performance()
            }
        }
        console.log('Firebase was successfully init.')
    }
}
