import Navbar from './components/Navbar'
import Services from './components/Services'
import Process from './components/Process'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MetaBalls from "./components/MetaBalls";

function App() {
  return (
    <>
      <Navbar />
      <MetaBalls />
      <Services />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default App
