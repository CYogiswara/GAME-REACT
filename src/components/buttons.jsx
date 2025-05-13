const Buttons = ({value, onClick}) => {
    return(
        <div>
            <input type="button" value={value} onClick={onClick}></input>
        </div>
    )
}

export default Buttons