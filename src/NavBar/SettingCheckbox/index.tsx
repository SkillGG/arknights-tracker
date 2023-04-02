import React, { Dispatch, FC, SetStateAction } from "react";
import HelpIcon, { HelpIconProps } from "../../HelpIcon";

interface SettingCheckboxProps {
    title?: string;
    label: string;
    id: string;
    toggleSetting: () => void;
    checked: boolean;
    disabled?: boolean;
    helpIcon?: HelpIconProps;
}

const SettingCheckbox: FC<SettingCheckboxProps> = ({
    checked,
    toggleSetting,
    helpIcon: hip,
    disabled,
    label,
    title,
    id,
}) => {
    return (
        <div className="setting-box" title={title}>
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
