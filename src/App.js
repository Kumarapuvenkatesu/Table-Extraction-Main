import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { Loading } from './components/FileUpload/Loading';
const Signup = lazy(() => import('./components/Signup/Signup'))
const Login = lazy(() => import('./components/Login/Login'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))
const Pdf = lazy(() => import("./components/FileUpload/Pdf"))
const Forget = lazy(() => import('./components/Forget/Forget'))
const MathCovertor = lazy(() => import('./components/FileUpload/MathCovertor'))
const Home = lazy(() => import('./components/Home/DashBoard'))
const ReceivedFiles = lazy(() => import('./components/FileUpload/ReceivedFiles'))
const TableExtraction = lazy(() => import('./components/FileUpload/TableExtraction'))
const SingleFile = lazy(() => import('./components/FileUpload/SingleFile'))
// const Footer = lazy(() => import('./components/Footer/Footer'))

// const Loading=lazy(()=>import('./components/FileUpload/Loading'))
// import Signup from './components/Signup/Signup';
// import Login from './components/Login/Login';
// import NotFound from './components/NotFound/NotFound';
// import Pdf from "./components/FileUpload/Pdf"
// import Forget from './components/Forget/Forget';
// import Footer from './components/Footer/Footer';
// // import File from "./components/FileUpload/SingleFile";
// import MathCovertor from './components/FileUpload/MathCovertor';
// import ReceivedFiles from './components/FileUpload/ReceivedFiles';
// import TableExtraction from './components/FileUpload/TableExtraction';
// import Home from './components/Home/DashBoard';
// import SingleFile from './components/FileUpload/SingleFile';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/signup' element={
            <Signup />
          } />
          <Route path='/login' element={
            <Login />
          } />
          <Route path='/' element={
            <Home />
          } />
          <Route path='/table-extraction' element={
            <TableExtraction />
          } />
          <Route path='/file' element={
          <SingleFile />} />
          <Route path='/pdf-to-word' element={
            <Pdf />
          } />
          <Route path='/math-convertor' element={
            <MathCovertor />
          } />
          <Route path='/received-files' element={
            <ReceivedFiles />
          } />
          <Route path="/forget" element={
            <Forget />
          } />
          <Route path='*' element={
            <NotFound />
          } />
        </Routes>
      </Suspense>
      {/* <Footer /> */}

    </BrowserRouter>
  )
}
