import boxIcon from '../../assets/icons/box.png'
import burgerMenuIcon from '../../assets/icons/burger-menu.png'
import lensIcon from '../../assets/icons/lens.png'
import arrowIcon from '../../assets/icons/left-right-arrow.png'
import userIcon from '../../assets/icons/people.png'
import pingIcon from '../../assets/icons/ping.png'

const myAlert = () => {
    alert("naciśnięto")
}

const buttonList = [
    {
        text: "Lista Urządzeń",
        icon: burgerMenuIcon,
        url: "/deviceslist",
        clickHandler: myAlert
    },
    {
        //text: "Wyszukaj",
        text: "TEST PAGE",
        icon: lensIcon,
        url: "/testpage",
        clickHandler: myAlert
    },
    {
        text: "Inwentaryzacja",
        icon: boxIcon,
        url: "/inventory",
        clickHandler: myAlert
    },
    {
        text: "Dodaj Urządzenie",
        icon: arrowIcon,
        url: "/device",
        clickHandler: myAlert
    },
    /*     {
            text: "Pinguj",
            icon: pingIcon,
            url: "/null",
            clickHandler: myAlert
        },
        {
            text: "Zarządzaj Użytkownikami",
            icon: userIcon,
            url: "/null",
            clickHandler: myAlert
        } */
]

export default buttonList