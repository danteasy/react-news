import React from "react";

import { ISelectOption } from "../exports";

interface ISelectProps {
    options: ISelectOption[];
    value?: undefined | number | string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}
export const Select = React.forwardRef(
    (
        {
            options,
            name,
            onChange = () => {},
            className = "",
            ...props
        }: ISelectProps,
        ref: React.Ref<HTMLSelectElement>
    ) => {
        return (
            <select
                {...props}
                ref={ref}
                onChange={e => onChange(e)}
                className={`py-1 px-2 rounded-md glassy-bg ${className}`}
            >
                {options.map((option: ISelectOption) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);
