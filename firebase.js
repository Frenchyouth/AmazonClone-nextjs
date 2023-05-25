import NextAuth from 'next-auth';
// import {  FirebaseAdapter } from "@next-auth/firebase-adapter";
import { initializeApp, getApp, getApps } from 'firebase'
// import { getFirestore, collection, getDoc, getDocs, query, where,limit, doc, addDoc,updateDoc,deleteDoc, runTransaction  } from "firebase/firestore/lite";
import getFirestore from 'firebase/firestore'
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { QuerySnapshot } from 'firebase/firestore';
import { useState } from 'react';
import firebase from 'firebase';



const firebaseConfig = {
  //firebase config here
};

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) : firebase.app()
// const db = getFirestore(app);
const db = app.firestore();

export {db};

