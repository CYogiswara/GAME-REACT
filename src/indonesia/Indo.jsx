import React, { useEffect, useRef, useState } from "react";
import Controller from '../component/Controller';
import '../Main.css';
import './Indo.css';

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

function Indo() {
    const [position, setPosition] = useState({ x: 565, y: 125 });
    const [facing, setFacing] = useState("down");
    const [walking, setWalking] = useState(false);
    const [heldDirections, setHeldDirections] = useState([]);
    const speed = 1;

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

    // Ambil karakter & nama dari localStorage
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    const playerName = localStorage.getItem("playerName");

    return (
        <>
            <div className="black-screen" id="blackScreen"></div>
            <div className="frame">
                <div className="camera">
                    <div className="map pixel-art" style={mapStyle}>
                        <div>
                            <div className="character-name">{playerName}</div>
                            <div
                                className="character"
                                facing={facing}
                                walking={walking ? "true" : "false"}
                                style={characterStyle}
                            >
                                <div className="shadow pixel-art"></div>
                                <div
                                    className="character_spritesheet pixel-art"
                                    style={{
                                        backgroundImage: selectedCharacter
                                            ? `url('${selectedCharacter}')`
                                            : "none"
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Controller onDirectionChange={setHeldDirections} />
        </>
    );
}

export default Indo;