import './LoggedInUser.css'

const LoggedInUser = (props) => {

    const logoutHandler = () => {
        alert("wyloguj")
    }

    return (
        <div className='logged_in_user'>
            <div className='logout'>
                <button onClick={logoutHandler}>Wyloguj</button>
            </div>
            <div className='user_name'>
                {props.user.firstName} {props.user.lastName}
            </div>

        </div>
    )
}

export default LoggedInUser