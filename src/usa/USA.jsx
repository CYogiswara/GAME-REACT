import React, { use, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Controller from '../components/Controller';
import DisplayDate from "../components/DisplayDate";
import Buttons from "../components/buttons";
import Status from "../components/status";
import './USA.css';

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

function USA() {
    let Navigate = useNavigate();
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    const [showMapButton, setShowMapButton] = useState(false);
    const [showMandiButton, setShowMandiButton] = useState(false);
    const [showFotoButton, setShowFotoButton] = useState(false);
    const [showDriverButton, setShowDriverButton] = useState(false);
    const [showMakanButton, setShowMakanButton] = useState(false);

    const [position, setPosition] = useState({ x: 10, y: 180 });
    const [facing, setFacing] = useState("down");
    const [walking, setWalking] = useState(false);
    const [heldDirections, setHeldDirections] = useState([]);
    const speed = 1;
    const [money, setMoney] = useState(() => Number(localStorage.getItem("money")) || 100);
    const [bath, setBath] = useState(() => Number(localStorage.getItem("bath")) || 50);
    const [hunger, setHunger] = useState(() => Number(localStorage.getItem("hunger")) || 50);
    const [sleep, setSleep] = useState(() => Number(localStorage.getItem("sleeps")) || 50);
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50);
    const [health, setHealth] = useState(() => Number(localStorage.getItem("health")) || 50);
    const [displayedQuests, setDisplayedQuests] = useState([]);
    const [showFoods, setShowFoods] = useState(false);

    // Black screen state
    const [showBlackScreen, setShowBlackScreen] = useState(false);
    function triggerBlackScreen(duration = 1000, callback) {
        setShowBlackScreen(true);
        setTimeout(() => {
            setShowBlackScreen(false);
            if (callback) callback();
        }, duration);
    }

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
            const leftLimit = -5;
            const rightLimit = 960;
            const topLimit = 130;
            const bottomLimit = 225;
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

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) || 2;
    const camera_left = pixelSize * 66;
    const camera_top = pixelSize * 42;
    const mapStyle = {
        transform: `translate3d(${-position.x * pixelSize + camera_left}px, ${-position.y * pixelSize + camera_top}px, 0)`
    };
    const characterStyle = {
        transform: `translate3d(${position.x * pixelSize}px, ${position.y * pixelSize}px, 0)`
    };
    //QUESTS
    useEffect(() => {
        const savedQuests = localStorage.getItem("displayedQuests");
        if (savedQuests) {
            setDisplayedQuests(JSON.parse(savedQuests));
        }
    }, []);

    // ============================================FOTO BUTTON===============================================
    function handleFotoClick() {
        triggerBlackScreen(1500, () => {
            alert("Kamu sedang foto foto didepan Patung Liberty");
        });
    }
    useEffect(() => {
        const fotoX = 920;
        const fotoY = 110;
        const range = 35;
        if (Math.abs(position.x - fotoX) < range && Math.abs(position.y - fotoY) < range) {
            setShowFotoButton(true);
        } else {
            setShowFotoButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showFotoButton) {
                handleFotoClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showFotoButton]);

    //======================================MANDI BUTTON========================================\
    function handleMandiClick() {
        triggerBlackScreen(1000, () => {
            let shower = 100;
            setBath(bath + shower);
            alert("Kamu sedang mandi di hotel berhantu");
            localStorage.setItem("bath", bath + shower);
        });
    }
    useEffect(() => {
        const mandiX = 400;
        const mandiY = 135;
        const range = 15;
        if (Math.abs(position.x - mandiX) < range && Math.abs(position.y - mandiY) < range) {
            setShowMandiButton(true);
        } else {
            setShowMandiButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMandiButton) {
                handleMandiClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMandiButton]);


    // ====================================MAKAN BUTTON=========================================
    const foods = [
        { name: "Mac & Cheese", cost: "$2", harga: 2, addBar: 20 },
        { name: "Fish & Chip", cost: "$4", harga: 4, addBar: 40 },
        { name: "Steak", cost: "$5", harga: 1, addBar: 50 }
    ];
    function MakanClicked() {
        setShowFoods(true);
    }
    function handleMakan(food) {
        triggerBlackScreen(1500, () => {
            alert(`Kamu sedang makan ${food.name}`);
            setHunger(prev => Math.min(prev + food.addBar, 100));
            setMoney(prevMoney => prevMoney - food.harga);
            setShowFoods(false);
            localStorage.setItem("hunger", hunger + food.addBar);
            localStorage.setItem("money", money - food.harga);
        });
    }
    useEffect(() => {
        const makanX = 175;
        const makanY = 135;
        const range = 10;
        if (Math.abs(position.x - makanX) < range && Math.abs(position.y - makanY) < range) {
            setShowMakanButton(true);
        } else {
            setShowMakanButton(false);
            setShowFoods(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMakanButton) {
                MakanClicked();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMakanButton]);


    //======================================MAP BUTTON======================================
    useEffect(() => {
        const mapX = 970;
        const mapY = 195;
        const range = 40;
        if (Math.abs(position.x - mapX) < range && Math.abs(position.y - mapY) < range) {
            setShowMapButton(true);
        } else {
            setShowMapButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMapButton) {
                handleMapClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMapButton]);
    function handleMapClick() {
        triggerBlackScreen(1000, () => {
            Navigate('/map');
        });
    }
    // ============================================DRIVER BUTTON===============================================
    function handleDriverClick() {
        triggerBlackScreen(1500, () => {
            alert("Kamu sedang mengemudi di U.S. Route 66");
        });
    }
    useEffect(() => {
        const driverX = 230;
        const driverY = 135;
        const range = 25;
        if (Math.abs(position.x - driverX) < range && Math.abs(position.y - driverY) < range) {
            setShowDriverButton(true);
        } else {
            setShowDriverButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showDriverButton) {
                handleDriverClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showDriverButton]);



    return (
        <>
            <div className="usa-root">
                <div className={`black-screen${showBlackScreen ? " show" : ""}`} id="blackScreen"></div>
                <div className="frame">
                    <div className="camera">
                        <div className="usa-map pixel-art" style={mapStyle}>
                            <div>
                                <div className="character" facing={facing} walking={walking ? "true" : "false"} style={characterStyle}>
                                    <div className="shadow pixel-art"></div>
                                    <div className="character_spritesheet pixel-art" style={{ backgroundImage: `url('${selectedCharacter}')` }}
                                    ></div>
                                </div>
                                <div id="quest-display">
                                    <h3>Quests List</h3>
                                    <ul id="quest-list">
                                        {displayedQuests.length === 0 ? (
                                            <li>Tidak ada quest aktif.</li>
                                        ) : (
                                            displayedQuests.map((quest, idx) => (
                                                <li key={idx}>
                                                    {quest.name}
                                                    <span
                                                        className="info-quest"
                                                        data-info={`Kamu akan mendapatkan $${quest.gaji}`}
                                                        style={{ marginLeft: 8, cursor: "pointer" }}
                                                        title={`Kamu akan mendapatkan $${quest.gaji}`}
                                                    >
                                                        (i)
                                                    </span>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                                <Status bath={bath} hunger={hunger} sleep={sleep} happiness={happiness} health={health} money={money} />
                                <DisplayDate />
                                <div className="button-map">{showMapButton && (<Buttons value="Map" className="map-button" onClick={handleMapClick} />)}</div>
                                <div className="button-driver">{showDriverButton && (<Buttons value="Driver" className={"driver-button"} onClick={handleDriverClick} />)}</div>
                                <div className="button-foto">{showFotoButton && (<Buttons value="Patung Liberty" className="foto-button" onClick={handleFotoClick} />)}</div>
                                <div className="button-mandi">{showMandiButton && (<Buttons value="Mandi" className={"mandi-button"} onClick={handleMandiClick} />)}</div>
                                <div className="button-makan">{showMakanButton && (<Buttons value="Makan" className={"makan-button"} onClick={MakanClicked} />)}</div>
                                {showFoods && (
                                    <div id="makanOptions" className="usa-makan-options">
                                        {foods.map((food, index) => (
                                            <button key={index} onClick={() => handleMakan(food)} style={{ marginBottom: 8, position: "relative" }} >
                                                {food.name}
                                                <span className="info-icon" data-cost={`Harga: ${food.cost}`} style={{ marginLeft: 8, cursor: "pointer" }} title={`Harga: ${food.cost}`}>(i)</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Controller onDirectionChange={setHeldDirections} />
            </div>
        </>
    );
}

export default USA;