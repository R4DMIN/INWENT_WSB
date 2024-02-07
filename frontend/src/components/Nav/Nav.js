import { useState } from 'react'
import './Nav.css'
import { MenuButtonShowMenu } from './MenuButton/MenuButton'
import { MenuList } from './MenuList/MenuList'
import arrowRight from '../../assets/icons/arrow_right.png'
import arrowLeft from '../../assets/icons/arrow_left.png'

const Nav = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const arrow = { left: arrowLeft, right: arrowRight }

    return (
        <div className={'nav ' + (isOpenMenu ? 'nav_open' : 'nav_close')}>
            <MenuList isOpenMenu={isOpenMenu} />
            <MenuButtonShowMenu clickHandler={() => setIsOpenMenu(!isOpenMenu)} isOpenMenu={isOpenMenu} arrow={arrow} />
        </div>
    )
}

export default Nav