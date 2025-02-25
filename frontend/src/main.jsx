import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import About from './pages/About.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import AdminDash from './pages/AdminDash.jsx';
import AddPackage from './pages/AddPackage.jsx';
import AddSubadmin from './pages/AddSubadmin.jsx';
import AllPackages from './pages/AllPackages.jsx';
import Addbranch from './pages/Addbranch.jsx';
import Allbranches from './pages/Allbranches.jsx';
import AllSubadmins from './pages/AllSubadmins.jsx';
import AllTrackorders from './pages/AllTrackorders.jsx';
import Branchtruck from './pages/Branchtruck.jsx';
import SubAdminDash from './pages/SubAdminDash.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,
    children: [
      {
        path: 'Home', // This will match the root path
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/admin',
        element: <AdminDash />,
        
      },
          {
            path: '/addpackage',
            element: <AddPackage />,
          },
          {
            path: '/addsubadmin',
            element: <AddSubadmin />,
          },
          {
            path: '/allpackages',
            element: <AllPackages />,
          },
        {
          path: '/addbranch',
          element: <Addbranch />,
        },
        {
          path : '/allbranches',
          element: <Allbranches/>
        },
      {
     path : '/Allsubadmins',
     element : <AllSubadmins/>
      },
      {
        path:'/Alltruckorders',
        element : <AllTrackorders/>
      },
      {
        path: '/branchTrack', // This will match any other path not covered above
        element: <Branchtruck/>,  // Replace with your own 404 component here.
      },
      {
        path: '/subadmin',
        element: <SubAdminDash/>,  // Replace with your own 404 component here.
      }

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

export default router;