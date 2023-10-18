import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vanLoader } from './pages/Van/Vans';
import VanDetail, {loader as vanDetailLoader} from './pages/Van/VanDetail';
import Layout from './components/Layout'
import Dashboard, {loader as dashboardLoader} from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './pages/Host/HostLayout'
import HostVans, {loader as hostVanLoader} from './pages/Host/HostVans';
import HostVansDetails, {loader as hostVansDetailsLoader} from './pages/Host/HostVanDetails';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanInfo from './pages/Host/HostVanInfo';
import NotFound from './pages/NotFound';
import Error from './Error';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import SignUp, {loader as signUpLoader, action as signingUpAction} from './pages/SignUp'
import {requireAuth} from './utils';
import ForgotPassword, { action as forgotPasswordAction} from './pages/ForgotPassword';
import AddHostVan, {action as addVanAction} from './pages/Host/AddHostVan';
import EditHostVan, {loader as editHostVanLoader, action as editVanAction} from './pages/Host/EditHostVan';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />} >
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path='login' element={<Login />} loader={loginLoader} action={loginAction}/>
    <Route path='signUp' element={<SignUp />} loader={signUpLoader} action={signingUpAction}/>
    <Route path='forgot-password' element={<ForgotPassword />} action={forgotPasswordAction}/>
    <Route path="vans" element={<Vans />} loader={vanLoader} errorElement={<Error />} />
    <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} errorElement={<Error />}/>
    <Route path="*" element={<NotFound />} />

    <Route path="host" element={<HostLayout />}  >
    <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
      />
      <Route path="income" element={<Income />}
       loader={async ({ request }) => await requireAuth(request)} />
      <Route path="reviews" element={<Reviews />}
        loader={async ({ request }) => await requireAuth(request)}/>
      <Route path="vans" element={<HostVans />}
        loader={
          hostVanLoader
        }  
        errorElement={<Error />}/>
        <Route path="editvan/:id" element={<EditHostVan />}
        loader={editHostVanLoader} action={editVanAction}
        errorElement={<Error />}></Route>
      <Route path="vans/:id" element={<HostVansDetails />}
        loader={hostVansDetailsLoader}
        errorElement={<Error />}>
        <Route index element={<HostVanInfo />}
          loader={async ({ request }) => await requireAuth(request)} />
        <Route path="pricing" element={<HostVanPricing />}
          loader={async ({ request }) => await requireAuth(request)} />
        <Route path="photos" element={<HostVanPhotos />}
         loader={async ({ request }) => await requireAuth(request)} />
      </Route>
      <Route path="addVan" element={<AddHostVan />}
      action={addVanAction}/>

    </Route>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
