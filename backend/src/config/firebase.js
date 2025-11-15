import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Only initialize Firebase if valid credentials are provided
let firebaseAdmin = null;

try {
  if (!admin.apps.length && process.env.FIREBASE_PRIVATE_KEY && 
      process.env.FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY') &&
      process.env.FIREBASE_PROJECT_ID !== 'demo-project') {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
    firebaseAdmin = admin;
    console.log('Firebase initialized successfully');
  } else {
    console.log('⚠️  Firebase not initialized - using demo mode');
  }
} catch (error) {
  console.log('⚠️  Firebase initialization failed - using demo mode:', error.message);
}

export default firebaseAdmin || admin;
