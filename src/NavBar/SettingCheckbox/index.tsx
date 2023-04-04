import React, { CSSProperties, FC } from "react";
import HelpIcon, { HelpIconProps } from "../../HelpIcon";

interface SettingCheckboxProps {
    title?: string;
    label: string;
    id: string;
    toggleSetting: () => void;
    checked: boolean;
    disabled?: boolean;
    helpIcon?: HelpIconProps;
    divStyle?: CSSProperties;
}

const SettingCheckbox: FC<SettingCheckboxProps> = ({
    checked,
    toggleSetting,
    helpIcon: hip,
    disabled,
    label,
    title,
    id,
    divStyle,
}) => {
    return (
        <div className="setting-box" style={divStyle} title={title}>
            <label htmlFor={id}>{label}</label>
            <input
                type="checkbox"
                disabled={disabled}
                id={id}
                checked={checked}
                onChange={toggleSetting}
            />
            {hip && <HelpIcon {...hip} />}
        </div>
    );
};

export default SettingCheckbox;
