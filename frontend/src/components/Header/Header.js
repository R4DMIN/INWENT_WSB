import "./Header.css"
import Logo from "./Logo/Logo"
import LoggedInUser from "./LoggedInUser/LoggedInUser"

const Header = () => {
    const testName = { firstName: 'Kamil', lastName: 'Zielińśki' }

    return (
        <div className="header">
            <Logo />
            <LoggedInUser user={testName} />
        </div>
    )
}

export default Header