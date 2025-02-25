import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages
const HomePage = lazy(() => import('./Pages/HomePage'))
const CreatePage = lazy(() => import('./Pages/CreatePage'))

function App() {


  return (

    <Box minH="100vh">
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/create' element={<CreatePage/>}/>
        </Routes>
      </Suspense>
    </Box>
    
        
  )
}

export default App
