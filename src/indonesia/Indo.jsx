import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Controller from '../components/Controller';
import DisplayDate from "../components/DisplayDate";
import Buttons from "../components/buttons";
import Status from "../components/status";
import './Indo.css';

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};



function Indo() {
    let Navigate = useNavigate()
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    const [showMapButton, setShowMapButton] = useState(false);
    const [position, setPosition] = useState({ x: 565, y: 125 });
    const [facing, setFacing] = useState("down");
    const [walking, setWalking] = useState(false);
    const [heldDirections, setHeldDirections] = useState([]);
    const speed = 1;
    const [money, setMoney] = useState(100)
    const [bath, setBath] = useState(() => Number(localStorage.getItem("bath")) || 50)
    const [hunger, setHunger] = useState(() => Number(localStorage.getItem("hunger")) || 50)
    const [sleep, setSleep] = useState(() => Number(localStorage.getItem("sleep")) || 50)
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50)
    const [health, setHealth] = useState(() => Number(localStorage.getItem("health")) || 50)
    const [currentQuest, setCurrentQuest] = useState([])
    const [questStarted, setQuestStarted] = useState(false)
    const [showFoods, setShowFoods] = useState(false)
    
    // Refs for animation
    const positionRef = useRef(position);
    const heldDirectionsRef = useRef(heldDirections);

    useEffect(() => {
        heldDirectionsRef.current = heldDirections;
    }, [heldDirections]);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    // Animation loop
    useEffect(() => {
        let animationFrameId;
        const step = () => {
            let { x, y } = positionRef.current;
            const held_direction = heldDirectionsRef.current[0];
            let moved = false;
            if (held_direction) {
                if (held_direction === directions.right) x += speed;
                if (held_direction === directions.left) x -= speed;
                if (held_direction === directions.down) y += speed;
                if (held_direction === directions.up) y -= speed;
                setFacing(held_direction);
                setWalking(true);
                moved = true;
            } else {
                setWalking(false);
            }
            // WALL LIMIT
            const leftLimit = 15;
            const rightLimit = 590;
            const topLimit = 100;
            const bottomLimit = 180;
            if (x < leftLimit) x = leftLimit;
            if (x > rightLimit) x = rightLimit;
            if (y < topLimit) y = topLimit;
            if (y > bottomLimit) y = bottomLimit;
            if (moved) setPosition({ x, y });
            positionRef.current = { x, y };
            animationFrameId = window.requestAnimationFrame(step);
        };
        animationFrameId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    // Style for map and character
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) || 2;
    const camera_left = pixelSize * 66;
    const camera_top = pixelSize * 42;
    const mapStyle = {
        transform: `translate3d(${-position.x * pixelSize + camera_left}px, ${-position.y * pixelSize + camera_top}px, 0)`
    };
    const characterStyle = {
        transform: `translate3d(${position.x * pixelSize}px, ${position.y * pixelSize}px, 0)`
    };
    {/*==================================== SLEEP ====================================*/ }
    function incrementSleep(){
        setSleep(prevSleep => prevSleep + 100)
        console.log(sleep)
    }
    function decrementSleep(){
        setSleep(prevSleep => prevSleep -= 1)
    }
    {/*==================================== FOTO =====================================*/ }
    function handleFoto() {
        alert("Kamu sedang foto")
        setMoney(prevMoney => prevMoney += 25)
    }
    {/* ====================================MANDI==================================== */ }
    function incrementShower() {
        let shower = 100
        setBath(bath + shower)
    }
    function decrementShower() {
        setBath(prevBath => prevBath -= 1)
        console.log(bath)
    }
    {/*=================================== MAKAN================================== */ }
    const foods = [
        { name: "Popmie", cost: "$2", harga: 2, addBar: 20 },
        { name: "Nasi Padang", cost: "$4", harga: 4, addBar: 40 },
        { name: "Eskrim", cost: "$1", harga: 1, addBar: 10 }
    ]
    function MakanClicked(){
        setShowFoods(true)
    }



    useEffect(() => {
        const mapX = 565;
        const mapY = 100;
        const range = 15;
        if (Math.abs(position.x - mapX) < range && Math.abs(position.y - mapY) < range) {
            setShowMapButton(true);
        } else {
            setShowMapButton(false);
        }
    }, [position]);
    return (
        <>
            <div className="indo-root">
                <div className="black-screen" id="blackScreen"></div>
                <div className="frame">
                    <div className="camera">
                        <div className="indo-map pixel-art" style={mapStyle}>
                            <div>
                                <div
                                    className="character"
                                    facing={facing}
                                    walking={walking ? "true" : "false"}
                                    style={characterStyle}
                                >
                                    <div className="shadow pixel-art"></div>
                                    <div
                                        className="character_spritesheet pixel-art"
                                        style={{backgroundImage: `url('${selectedCharacter}')`}}
                                    ></div>
                                </div>
                                <Status bath={bath} hunger={hunger} sleep={sleep} happiness={happiness} health={health}/>
                                <DisplayDate/>
                                <div class="button-map "><Buttons value="Map" className="button-map" onClick={() => Navigate('/map')} /></div>
                                <div class="button-sleep "><Buttons value="Sleep" onClick={incrementSleep}/></div>
                                <div class="button-foto"><Buttons value="Foto" onClick={handleFoto} /></div>
                                <div class="button-mandi"><input className="mandi-button" type="button" value="Mandi" onClick={incrementShower}></input></div>
                                
                                <Buttons value="Makan" onClick={MakanClicked} />
                            </div>
                        </div>
                    </div>
                </div>
                <Controller onDirectionChange={setHeldDirections} />
            </div>
        </>
    );
}

export default Indo;
