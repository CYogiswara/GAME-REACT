const Status = ({bath, hunger, sleep, happiness, health}) => {
    return (
        <div>
            <progress value={bath} max="100"></progress>
            <progress value={hunger} max="100"></progress>
            <progress value={sleep} max="100"></progress>
            <progress value={happiness} max="100"></progress>
            <progress value={health} max="100"></progress>
        </div>
    )
}

export default Status