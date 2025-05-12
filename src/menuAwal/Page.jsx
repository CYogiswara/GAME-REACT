import React, { useState } from 'react';
import './Page.css';

const spritesheets = [
    "/asset/character/char1.png",
    "/asset/character/char2.png",
    "/asset/character/char3.png",
    "/asset/character/char4.png",
    "/asset/character/char5.png",
];

function Page() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [playerName, setPlayerName] = useState('');

    const handleSetActive = (index) => {
        setActiveIndex(index);
    };

    const handlePrev = () => {
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : spritesheets.length - 1);
    };

    const handleNext = () => {
        setActiveIndex(activeIndex < spritesheets.length - 1 ? activeIndex + 1 : 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim() === "") {
            alert("Silakan masukkan nama sebelum memulai!");
            return;
        }
        localStorage.setItem("playerName", playerName);
        localStorage.setItem("selectedCharacter", spritesheets[activeIndex]);
        localStorage.setItem("money", 100);
        localStorage.setItem("hours", "17");
        localStorage.setItem("minutes", "0");
        localStorage.setItem("day", 1);
        localStorage.setItem("weekDay", "Monday");
        localStorage.setItem("canWalk", "false");
        localStorage.setItem("bath", 50);
        localStorage.setItem("hunger", 50);
        localStorage.setItem("sleeps", 50);
        localStorage.setItem("happy", 50);
        localStorage.setItem("health", 100);
        localStorage.removeItem("currentQuest");
    };

    return (
        <div>
            <div>
                <img src="/asset/character/pesawat.png" className="w-50 m-auto mb-5" alt="Pesawat" />
                <h2 className="font-mono text-center mb-5">UMN - UDIN MENJELAJAH NEGARA</h2>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-gradient-to-b from-orange-700 to-green-600 h-95 w-full mt-10">
                <div className="flex items-center justify-center mb-4">
                    <main className="Container">
                        <div className="Character">
                            {spritesheets.map((sprite, idx) => (
                                <div
                                    key={sprite}
                                    className={`PixelArtImage Character_sprite-sheet index-${idx} ${activeIndex === idx ? 'active' : ''}`}
                                    style={{
                                        display: activeIndex === idx ? 'block' : 'none',
                                        backgroundImage: `url(${sprite})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '400px 400px',
                                        animation: activeIndex === idx ? 'walkAnimation 0.6s steps(4) infinite' : 'none',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="Navigation flex-center">
                            {spritesheets.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`NavigationBubble index-${idx} ${activeIndex === idx ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleSetActive(idx)}
                                />
                            ))}
                        </div>
                        <button
                            className="NextSpritesheetButton NextSpritesheetButton--prev"
                            type="button"
                            onClick={handlePrev}
                        >
                            <svg viewBox="0 -0.5 4 7" shapeRendering="crispEdges">
                                <path stroke="#434343" d="M3 0h1M2 1h1M1 2h1M0 3h1M1 4h1M2 5h1M3 6h1" />
                            </svg>
                        </button>
                        <button
                            className="NextSpritesheetButton NextSpritesheetButton--next"
                            type="button"
                            onClick={handleNext}
                        >
                            <svg viewBox="0 -0.5 4 7" shapeRendering="crispEdges">
                                <path stroke="#434343" d="M0 0h1M1 1h1M2 2h1M3 3h1M2 4h1M1 5h1M0 6h1" />
                            </svg>
                        </button>
                    </main>
                </div>
                <form id="characterForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="playerName"
                        placeholder="Enter your name here..."
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-black text-white py-2 rounded">
                        Start Exploring
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;