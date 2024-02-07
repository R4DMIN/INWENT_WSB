import { Link } from 'react-router-dom'
import './MenuButton.css'

const MenuButton = (props) => {
    return (
        <Link to={props.url}>
            <div className="menu_button" title={props.isOpenMenu ? "" : props.text} >
                <MenuButtonIcon icon={props.icon} />
                {props.isOpenMenu ? <MenuButtonText text={props.text} /> : ""}
            </div>
        </Link>
    )
}

const MenuButtonShowMenu = (props) => {
    return (
        <div className="menu_button" onClick={props.clickHandler}>
            {props.isOpenMenu ? <MenuButtonIcon icon={props.arrow.left} /> : <MenuButtonIcon icon={props.arrow.right} />}
            {props.isOpenMenu ? <MenuButtonText text={'Pokaż'} /> : ""}
        </div>
    )
}

const MenuButtonIcon = (props) => {
    return (
        <div className="menu_button_icon">
            <img src={props.icon} alt='icon_img' width='50px' height='50px' ></img>
        </div >
    )
}

const MenuButtonText = (props) => {
    return (
        <div className="menu_button_text">
            {props.text}
        </div>
    )
}

export { MenuButton, MenuButtonShowMenu }