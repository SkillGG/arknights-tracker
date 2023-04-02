import React, { CSSProperties, FC } from "react";

export interface HelpIconProps {
    title?: string;
    style?: CSSProperties;
    className?: string;
    id?: string;
    svgprops?: React.SVGProps<SVGSVGElement>;
}

const HelpIcon: FC<HelpIconProps> = ({ title, style, id, className }) => {
    return (
        <div
            style={{
                ...style,
            }}
            title={title}
            id={id}
            className={className}
        >
            &#x1F6C8;
        </div>
    );
};

export default HelpIcon;
