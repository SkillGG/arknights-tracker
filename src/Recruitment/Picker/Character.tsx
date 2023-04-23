import React, { CSSProperties, FC, useState } from "react";
import { Settings } from "./../../utils";

interface CharacterProps {
    stars: number;
    name: string;
    settings: Settings;
    image: string;
    showTag?: boolean;
    hoveredStyle?: CSSProperties;
    tags?: string[];
}

const Character: FC<CharacterProps> = ({
    stars,
    name,
    settings,
    image,
    showTag,
    tags,
    hoveredStyle,
}) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            className="character"
            style={hover ? hoveredStyle : {}}
            data-good={stars}
            tabIndex={
                settings.characterDatabase ||
                (settings.saveHistory && settings.clickToSelectOutcome)
                    ? 0
                    : -1
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
        >
            <figure
                onClick={() =>
                    settings.characterDatabase &&
                    window.open(
                        `https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=${name}`,
                        "_blank"
                    )
                }
                title={`Check ${name}`}
            >
                <img src={image} width={100} height={100} />
                <figcaption>
                    {name}
                    <br />
                    <b>{"⭐".repeat(stars)}</b>
                    {showTag && tags && (
                        <>
                            <br />
                            <p>{tags.join(", ")}</p>
                        </>
                    )}
                </figcaption>
            </figure>
        </div>
    );
};

export default Character;
