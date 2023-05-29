import { React, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout'
import PrivateRoute from '../navigation/PrivateRoute'
import Login from '../auth/login/Login';
import ForgetPassword from '../auth/forget-password/ForgetPassword';
import ResetPassword from '../auth/reset-password/ResetPassword';
import Register from '../auth/registration/Registration';
import PageNotFound from '../components/page-not-found/PageNotFound'
import Dashboard from '../pages/dashboard/Dashboard';
import Products from '../pages/products/Products';
import ContactUs from '../pages/contact-us/ContactUs';

const AddProductForm = lazy(() => import('../components/forms/ProductForm'));
const ReactHookForm = lazy(() => import('../components/forms/ReactHookForm'));
const YupReactHookForm = lazy(() => import('../components/forms/YupReactHookForm'));

const Router = () => {

  const Router = [
    
    {
      path: '/dashboard',
      component: <Dashboard />,
    },
    {
      path: '/products',
      component: <Products />,
    },
    {
      path: '/add-product-form',
      component: <AddProductForm />,
    },
    {
      path: '/react-hook-form',
      component: <ReactHookForm />,
    },
    {
      path: '/yup-react-hook-form',
      component: <YupReactHookForm />,
    },
    {
      path: '/contact-us',
      component: <ContactUs />,
    },
  ];

  return (
    <>
      <h1>Testing  Lazy Loading</h1>
    <Routes>

      {/* protected route is for Layout model */}

      <Route path='/' element={
        <PrivateRoute >
          <Layout />
        </PrivateRoute>
      }>
        {Router.map((route, index) => (
          <Route
            key={index}
            index={route.index}
            path={route.path}
            element={<Suspense fallback={<>Loading...</>}>{route.component}</Suspense>}
          />
        ))}
      </Route>
          
{/* ---------------------------------------------------------------------------------------------------------------------- */}

    {/* Protected Route is for basic, to access particular component through navbar */}
{/* 
      <Route element={<PrivateRoute />}>
          {Router.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                index={route.index}
                element={<Suspense fallback={<>...</>}>{route.component}</Suspense>}
              />
            ))}
      </Route> */}

      {/*or As a children  */}

      {/* <Route path="/reset-password" element={
        <PrivateRoute>
          <ResetPassword />
        </PrivateRoute>
    }  
      /> */}

{/* ---------------------------------------------------------------------------------------------------------------------- */}


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default Router