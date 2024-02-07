import './App.css'
import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import Nav from "./components/Nav/Nav"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <div className='app_main'>
                    <Nav />
                    <Main />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App