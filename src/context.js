import { useContext,createContext, useState, useRef, useEffect } from "react";
import { redirect} from "react-router-dom";


import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseInit";
import {db } from "./firebaseInit"
import {set,ref} from "firebase/database"
import {toast} from "react-toastify"

const itemContext = createContext();
function ContextProvider({children}){
    const [isLoggedIn,setisLoggedIn]= useState(false);
    const nameRef=useRef();
    const emailRefSignUp=useRef();
    const passRefSignUp=useRef();
    const emailRefSignIn=useRef();
    
    const passRefSignIn=useRef();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setisLoggedIn(true);
          } else {
            setisLoggedIn(false);
          }
        });
        return () => unsubscribe();
      }, []);

      const handleLogout = async() => {
        signOut(auth)
          .then(() => {
            toast.success("Logged Out Successfully!")
            setisLoggedIn(false);
            window.location.href="/";
          })
          .catch((error) => {
            toast.error("Error: ", error.message);
            console.error('Error logging out:', error);
          });
      }
    const handleSubmitSignUp=async (e)=>{
        e.preventDefault();
        const name=nameRef.current.value;
        const email=emailRefSignUp.current.value;
        const password=passRefSignUp.current.value;
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Store the user in the Firebase Realtime Database
            await set(ref(db, `users/${user.uid}`), {
                name: name,
                email: email,
            });
            // Clear the input fields after successful signup
            handleClear(name,email,password);
            toast.success("You are now Signed Up!");
            // Sign-in successful, redirect to home page
            window.location.href= '/signin';
            setisLoggedIn(true);
        } catch(error) {
            console.log("error happened");
            toast.error(error.message);
        }
    }
    const handleClear=(...args)=>{
        let length=args.length;
        for(let i=0;i<length;i++){
            args[i]="";
        }
    }
    const handleSubmitSignIn = async (e) => {
        e.preventDefault();

        const email = emailRefSignIn.current.value;
        const password = passRefSignIn.current.value;

        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Sign-in successful, redirect to home page
            toast.success("You are now Signed In!");
            setisLoggedIn(true)
            
              window.location.href= '/secured-page';
            
            
            
        } catch (error) {
            handleClear(email,password);
            toast.error("error signing in")
            window.location.href= '/'
        }
    };
    return(
        <itemContext.Provider value={{  isLoggedIn,
                                        nameRef,
                                        emailRefSignUp,
                                        emailRefSignIn,
                                        passRefSignUp,
                                        passRefSignIn,
                                        handleSubmitSignUp,
                                        handleSubmitSignIn,
                                        handleLogout}}>
            {children}
        </itemContext.Provider>
    )
}
function useValue() {
  const value = useContext(itemContext);
  return value;
}
export {useValue};
export default ContextProvider;
