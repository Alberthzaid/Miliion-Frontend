import { Navbar } from './Components/common/Nav'
import { Home } from './Pages/Home'
import {Routes , Route , BrowserRouter} from "react-router-dom";
import { PropertyProfile } from './Pages/PropertyProfile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/property/:id" element={<PropertyProfile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
