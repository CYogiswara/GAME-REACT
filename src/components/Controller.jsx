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
            <div className="DemoDirectionUI flex-center">
                <button
                    className="dpad-button dpad-left"
                    onMouseDown={() => handleDpadPress(directions.left)}
                    onMouseUp={handleDpadRelease}
                    onTouchStart={() => handleDpadPress(directions.left)}
                    onTouchEnd={handleDpadRelease}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 13" shapeRendering="crispEdges">
                        <path className="Arrow_outline-top" stroke="#5f5f5f"
                            d="M1 0h11M0 1h1M12 1h1M0 2h1M12 2h1M0 3h1M12 3h1M0 4h1M12 4h1M0 5h1M12 5h1M0 6h1M12 6h1M0 7h1M12 7h1M0 8h1M12 8h1" />
                        <path className="Arrow_surface" stroke="#f5f5f5"
                            d="M1 1h11M1 2h11M1 3h5M7 3h5M1 4h4M7 4h5M1 5h3M7 5h5M1 6h4M7 6h5M1 7h5M7 7h5M1 8h11" />
                        <path className="Arrow_arrow-inset" stroke="#434343" d="M6 3h1M5 4h1M4 5h1" />
                        <path className="Arrow_arrow-body" stroke="#5f5f5f" d="M6 4h1M5 5h2M5 6h2M6 7h1" />
                        <path className="Arrow_outline-bottom" stroke="#434343"
                            d="M0 9h1M12 9h1M0 10h1M12 10h1M0 11h1M12 11h1M1 12h11" />
                        <path className="Arrow_edge" stroke="#ffffff" d="M1 9h11" />
                        <path className="Arrow_front" stroke="#cccccc" d="M1 10h11M1 11h11" />
                    </svg>
                </button>
                <button
                    className="dpad-button dpad-up"
                    onMouseDown={() => handleDpadPress(directions.up)}
                    onMouseUp={handleDpadRelease}
                    onTouchStart={() => handleDpadPress(directions.up)}
                    onTouchEnd={handleDpadRelease}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 13" shapeRendering="crispEdges">
                        <path className="Arrow_outline-top" stroke="#5f5f5f"
                            d="M1 0h11M0 1h1M12 1h1M0 2h1M12 2h1M0 3h1M12 3h1M0 4h1M12 4h1M0 5h1M12 5h1M0 6h1M12 6h1M0 7h1M12 7h1M0 8h1M12 8h1" />
                        <path className="Arrow_surface" stroke="#f5f5f5"
                            d="M1 1h11M1 2h11M1 3h11M1 4h5M7 4h5M1 5h4M8 5h4M1 6h3M9 6h3M1 7h11M1 8h11" />
                        <path className="Arrow_arrow-inset" stroke="#434343" d="M6 4h1M5 5h1M7 5h1" />
                        <path className="Arrow_arrow-body" stroke="#5f5f5f" d="M6 5h1M4 6h5" />
                        <path className="Arrow_outline-bottom" stroke="#434343"
                            d="M0 9h1M12 9h1M0 10h1M12 10h1M0 11h1M12 11h1M1 12h11" />
                        <path className="Arrow_edge" stroke="#ffffff" d="M1 9h11" />
                        <path className="Arrow_front" stroke="#cccccc" d="M1 10h11M1 11h11" />
                    </svg>
                </button>
                <button
                    className="dpad-button dpad-down"
                    onMouseDown={() => handleDpadPress(directions.down)}
                    onMouseUp={handleDpadRelease}
                    onTouchStart={() => handleDpadPress(directions.down)}
                    onTouchEnd={handleDpadRelease}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 13" shapeRendering="crispEdges">
                        <path className="Arrow_outline-top" stroke="#5f5f5f"
                            d="M1 0h11M0 1h1M12 1h1M0 2h1M12 2h1M0 3h1M12 3h1M0 4h1M12 4h1M0 5h1M12 5h1M0 6h1M12 6h1M0 7h1M12 7h1M0 8h1M12 8h1" />
                        <path className="Arrow_surface" stroke="#f5f5f5"
                            d="M1 1h11M1 2h11M1 3h11M1 4h3M9 4h3M1 5h4M8 5h4M1 6h5M7 6h5M1 7h11M1 8h11" />
                        <path className="Arrow_arrow-inset" stroke="#434343" d="M4 4h5" />
                        <path className="Arrow_arrow-body" stroke="#5f5f5f" d="M5 5h3M6 6h1" />
                        <path className="Arrow_outline-bottom" stroke="#434343"
                            d="M0 9h1M12 9h1M0 10h1M12 10h1M0 11h1M12 11h1M1 12h11" />
                        <path className="Arrow_edge" stroke="#ffffff" d="M1 9h11" />
                        <path className="Arrow_front" stroke="#cccccc" d="M1 10h11M1 11h11" />
                    </svg>
                </button>
                <button
                    className="dpad-button dpad-right"
                    onMouseDown={() => handleDpadPress(directions.right)}
                    onMouseUp={handleDpadRelease}
                    onTouchStart={() => handleDpadPress(directions.right)}
                    onTouchEnd={handleDpadRelease}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 13" shapeRendering="crispEdges">
                        <path className="Arrow_outline-top" stroke="#5f5f5f"
                            d="M1 0h11M0 1h1M12 1h1M0 2h1M12 2h1M0 3h1M12 3h1M0 4h1M12 4h1M0 5h1M12 5h1M0 6h1M12 6h1M0 7h1M12 7h1M0 8h1M12 8h1" />
                        <path className="Arrow_surface" stroke="#f5f5f5"
                            d="M1 1h11M1 2h11M1 3h5M7 3h5M1 4h5M8 4h4M1 5h5M9 5h3M1 6h5M8 6h4M1 7h5M7 7h5M1 8h11" />
                        <path className="Arrow_arrow-inset" stroke="#434343" d="M6 3h1M7 4h1M8 5h1" />
                        <path className="Arrow_arrow-body" stroke="#5f5f5f" d="M6 4h1M6 5h2M6 6h2M6 7h1" />
                        <path className="Arrow_outline-bottom" stroke="#434343"
                            d="M0 9h1M12 9h1M0 10h1M12 10h1M0 11h1M12 11h1M1 12h11" />
                        <path className="Arrow_edge" stroke="#ffffff" d="M1 9h11" />
                        <path className="Arrow_front" stroke="#cccccc" d="M1 10h11M1 11h11" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Controller;