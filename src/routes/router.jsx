import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "fridge",
        element: <div>Fridge Page</div>,
      },
      {
        path: "add-food",
        element: <div>Add Food Page</div>,
      },
      {
        path: "my-items",
        element: <div>My Items Page</div>,
      },
      {
        path: "login",
        element: <div>Login Page</div>,
      },
      {
        path: "register",
        element: <div>Register Page</div>,
      },
    ],
  },
]);