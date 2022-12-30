import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Landing, Error, Register } from './pages'
// import {
//   AllJobs,
//   Profile,
//   // SharedLayout,
//   // Stats,
//   AddJob,
//   Register,
//   Error
// } from './pages/dashboard'   

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path='all-jobs' element={<AllJobs />} /> */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
