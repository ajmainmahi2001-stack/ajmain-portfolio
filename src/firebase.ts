import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import toast from 'react-hot-toast';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We throw a JSON string as requested in the instructions
  throw new Error(JSON.stringify(errInfo));
}

export const signInWithGoogle = async () => {
  const toastId = toast.loading('Signing in...');
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user.email !== 'ajmainmahi2001@gmail.com') {
      await signOut(auth);
      toast.error('Unauthorized access. Only ajmainmahi2001@gmail.com is allowed.', { id: toastId });
      throw new Error('Unauthorized access.');
    }
    toast.success('Signed in successfully!', { id: toastId });
    return result.user;
  } catch (error: any) {
    console.error('Auth Error:', error);
    let message = 'Failed to sign in.';
    if (error.code === 'auth/popup-blocked') {
      message = 'Popup blocked! Please allow popups for this site.';
    } else if (error.code === 'auth/unauthorized-domain') {
      message = 'This domain is not authorized in Firebase Console.';
    } else if (error.message) {
      message = error.message;
    }
    toast.error(message, { id: toastId });
    throw error;
  }
};
