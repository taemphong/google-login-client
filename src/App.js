import './App.css';
import Headers from './components/layouts/Headers';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';
import { auth } from './components/fierbase';
import { currentUser } from './components/functions/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idToken = await user.getIdTokenResult()
        // console.log('App.js useEffect',user.email)
        // console.log('App.js useEffect',idToken.token)
        currentUser(idToken.token)
        .then((res) =>{
          console.log('result',res.data)
          dispatch(login({
            email: user.email,
            name: user.name,
            token: idToken.token
          }))
        })
        .catch((err) =>console.log(err))

        
      }
    })
  
    return ()=>{
      unsubscribe();
    }
  }, )
  return (
    <div className="App">
      <BrowserRouter>
      <Headers />
      <Routes>
      <Route
      path='/'
      element={<Home />}>
      </Route>
      <Route
      path='/login'
      element={<Login/>}>
      </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
