import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import UserForm from "./pages/userForm"
import Data from "./pages/data"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />}></Route>
          <Route path="/edit/:id" element={<UserForm />}></Route>
          <Route path="/data" element={<Data />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
