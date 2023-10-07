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
import './server'
import VanDetail, {loader as vanDetailLoader} from './pages/Van/VanDetail';
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard';
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
import {requireAuth} from './utils';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />} >
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path='login' element={<Login />} loader={loginLoader} action={loginAction}/>
    <Route path="vans" element={<Vans />} loader={vanLoader} />
    <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader}/>
    <Route path="*" element={<NotFound />} />

    <Route path="host" element={<HostLayout />}  >
      <Route index element={<Dashboard />}
       loader={async ({ request }) => await requireAuth(request)} />
      <Route path="income" element={<Income />}
       loader={async ({ request }) => await requireAuth(request)} />
      <Route path="reviews" element={<Reviews />}
        loader={async ({ request }) => await requireAuth(request)}/>
      <Route path="vans" element={<HostVans />}
        loader={
          hostVanLoader
        } />

      <Route path="vans/:id" element={<HostVansDetails />}
        loader={hostVansDetailsLoader}>
        <Route index element={<HostVanInfo />}
          loader={async ({ request }) => await requireAuth(request)} />
        <Route path="pricing" element={<HostVanPricing />}
          loader={async ({ request }) => await requireAuth(request)} />
        <Route path="photos" element={<HostVanPhotos />}
         loader={async ({ request }) => await requireAuth(request)} />
      </Route>

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
