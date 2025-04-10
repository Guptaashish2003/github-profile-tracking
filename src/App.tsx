import { ToastContainer } from "react-toastify"
import DashBoard from "./components/DashBoard/DashBoard"
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <div >
      <Navbar />
      <DashBoard />
      <ToastContainer />
    </div>
  )
}

export default App