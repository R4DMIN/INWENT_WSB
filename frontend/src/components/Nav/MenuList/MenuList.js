import './MenuList.css'
import { MenuButton } from '../MenuButton/MenuButton'
import buttonList from '../testButton'

const MenuList = (props) => {
    const buttons = buttonList.map((button) =>
        <MenuButton text={button.text} icon={button.icon} url={button.url} isOpenMenu={props.isOpenMenu} key={button.text} />)
    return (
        <div className="menu_list">
            {buttons}
        </div>
    )
}

const SubMenuList = (props) => {
    return (
        <div className='sub_menu_list'>
        </div>
    )
}

export { MenuList, SubMenuList }