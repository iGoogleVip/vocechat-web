// import { useState } from "react";
import { Route, Routes, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import Welcome from './Welcome'
import NotFoundPage from './404';
import LoginPage from './login';
import HomePage from './home';
import ChatPage from './chat';
import ContactsPage from './contacts';
import RequireAuth from '../common/component/RequireAuth';

import store from '../app/store.with.persist';
import InvitePage from './invite';
// import getStore from "../app/store";

const PageRoutes = () => {
 return (
  <HashRouter>
   <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/invite" element={<InvitePage />} />
    <Route
     path="/"
     element={
      <RequireAuth>
       <HomePage />
      </RequireAuth>
     }
    >
     <Route index element={<ChatPage />} />
     <Route path="chat">
      <Route index element={<ChatPage />} />
      <Route path="channel/:channel_id" element={<ChatPage />} />
      <Route path="dm/:user_id" element={<ChatPage />} />
     </Route>
     <Route path="contacts">
      <Route index element={<ContactsPage />} />
      <Route path=":user_id" element={<ContactsPage />} />
     </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
   </Routes>
  </HashRouter>
 );
};
// const local_key = "AUTH_DATA";
export default function ReduxRoutes() {
 // const [authData, setAuthData] = useState(
 //   JSON.parse(localStorage.getItem(local_key))
 // );
 // const updateAuthData = (data) => {
 //   localStorage.setItem(local_key, JSON.stringify(data));
 //   setAuthData(data);
 // };
 return (
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistStore(store)}>
    <PageRoutes />
   </PersistGate>
   {/* {authData ? (
        <PersistGate loading={null} persistor={persistStore(getPersistStore())}>
          <PageRoutes authData={authData} updateAuthData={updateAuthData} />
        </PersistGate>
      ) : (
        <PageRoutes authData={authData} updateAuthData={updateAuthData} />
      )} */}
  </Provider>
 );
}