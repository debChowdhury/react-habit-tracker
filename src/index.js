import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import ErrorPage from './error-page';
import Details from './details';
import './index.css';
import {
  createHashRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

// creating root
const container = document.getElementById('root');
const root = createRoot(container);

// creating browser router from react-router-dom
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "details/:id",
    element: <Details />,
  },
]);

// rendering the Router Provider component by the root enclosed by the redux provider store
root.render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  
);


