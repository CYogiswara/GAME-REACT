import React, { useEffect } from "react";

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
    87: directions.up, // W
    65: directions.left, // A
    68: directions.right, // D
    83: directions.down, // S
};

function Controller({ onDirectionChange }) {
    useEffect(() => {
        let heldDirections = [];

        const handleKeyDown = (e) => {
            const dir = keys[e.which];
            if (dir && !heldDirections.includes(dir)) {
                heldDirections.unshift(dir);
                onDirectionChange([...heldDirections]);
            }
        };

        const handleKeyUp = (e) => {
            const dir = keys[e.which];
            if (dir) {
                heldDirections = heldDirections.filter((d) => d !== dir);
                onDirectionChange([...heldDirections]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [onDirectionChange]);

    // Mouse/touch DPAD
    const handleDpadPress = (direction) => {
        onDirectionChange([direction]);
    };

    const handleDpadRelease = () => {
        onDirectionChange([]);
    };

    return (
        <div className="dpad">
            <button
                className="dpad-button dpad-left"
                onMouseDown={() => handleDpadPress(directions.left)}
                onMouseUp={handleDpadRelease}
                onTouchStart={() => handleDpadPress(directions.left)}
                onTouchEnd={handleDpadRelease}
            >
                ←
            </button>
            <button
                className="dpad-button dpad-up"
                onMouseDown={() => handleDpadPress(directions.up)}
                onMouseUp={handleDpadRelease}
                onTouchStart={() => handleDpadPress(directions.up)}
                onTouchEnd={handleDpadRelease}
            >
                ↑
            </button>
            <button
                className="dpad-button dpad-right"
                onMouseDown={() => handleDpadPress(directions.right)}
                onMouseUp={handleDpadRelease}
                onTouchStart={() => handleDpadPress(directions.right)}
                onTouchEnd={handleDpadRelease}
            >
                →
            </button>
            <button
                className="dpad-button dpad-down"
                onMouseDown={() => handleDpadPress(directions.down)}
                onMouseUp={handleDpadRelease}
                onTouchStart={() => handleDpadPress(directions.down)}
                onTouchEnd={handleDpadRelease}
            >
                ↓
            </button>
        </div>
    );
}

export default Controller;