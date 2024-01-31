import React from "react";
import { TbNews } from "react-icons/tb";

interface ILogoProps {
    clickable: boolean;
}

export const Logo: React.FC<ILogoProps> = ({ clickable }) => {
    const clickableCb = clickable ? () => window.location.reload() : () => {};
    return (
        <div
            className={`flex items-center gap-2 ${
                clickable ? "cursor-pointer" : ""
            }`}
            onClick={clickableCb}
        >
            <TbNews size="2.25rem" />
            <span className="text-[2rem]">News</span>
        </div>
    );
};
