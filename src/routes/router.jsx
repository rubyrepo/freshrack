import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import Fridge from "../pages/Fridge";
import FoodDetails from "../pages/FoodDetails";
import MyItems from "../pages/MyItems";

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
        element: <Fridge />,
      },
      {
        path: "add-food",
        element: <AddFood />,
      },
      {
        path: "my-items",
        element: <MyItems />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "food/:id",
        element: <FoodDetails />,
      },
    ],
  },
]);