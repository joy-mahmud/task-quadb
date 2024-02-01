
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../components/Home";
import Main from "../components/Main";
import ShowDetails from "../components/ShowDetails";
import MyBookings from "../components/MyBookings";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[{
        path:'/',
        element:<Home></Home>
      },{
        path:'/showDetails/:id',
        element:<ShowDetails></ShowDetails>
      },{
        path:'/myBookings',
        element:<MyBookings></MyBookings>
      }
    ]
    },
  ]);