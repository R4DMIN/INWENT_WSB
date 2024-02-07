import './Button.css'

const Button = ({ name, buttonHandler }) => {

    return (
        <div className='InwentButton1'><button onClick={buttonHandler}>{name}</button></div>
    )
}

export default Button