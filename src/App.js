import React, { Suspense, lazy } from "react";
import {HashRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './components/FileUpload/Loading';
// const Signup = lazy(() => import('./components/Signup/Signup'));
const Login = lazy(() => import('./components/Login/Login'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));
const Pdf = lazy(() => import("./components/FileUpload/Pdf"));
const Forget = lazy(() => import('./components/Forget/Forget'));
const MathCovertor = lazy(() => import('./components/FileUpload/MathCovertor'));
const Home = lazy(() => import('./components/Home/DashBoard'));
const ReceivedFiles = lazy(() => import('./components/FileUpload/ReceivedFiles'));
const TableExtraction = lazy(() => import('./components/FileUpload/TableExtraction'));
// const SingleFile = lazy(() => import('./components/FileUpload/SingleFile'));
// const Footer = lazy(() => import('./components/Footer/Footer'))

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/table-extraction' element={<TableExtraction />} />
          {/* <Route path='/file' element={<SingleFile />} /> */}
          <Route path='/pdf-to-word' element={<Pdf />} />
          <Route path='/math-convertor' element={<MathCovertor />} />
          <Route path='/received-files' element={<ReceivedFiles />} />
          <Route path="/forget" element={<Forget />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </HashRouter>
  )
}
