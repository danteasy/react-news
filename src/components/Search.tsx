import React, { useRef } from "react";

import { RxCross2 } from "react-icons/rx";

interface ISearchProps {
    handleOnChange: Function;
    searchValue?: string | undefined;
    keyToChange: string;
    onSubmitCb: Function;
    className?: string;
    inputClassName?: string;
    render?: (() => React.ReactNode) | (() => HTMLElement) | undefined;
}

export const Search: React.FC<ISearchProps> = props => {
    const {
        handleOnChange,
        searchValue,
        keyToChange,
        onSubmitCb,
        className = "",
        inputClassName = "",
        render,
    } = props;
    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
            onSubmitCb();
        }
    };
    const clearField = () => {
        handleOnChange({ [keyToChange]: "" });
    };
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={`mb-4 flex items-center glassy-bg rounded-lg py-2 px-2 mx-auto ${className}`}
        >
            <input
                ref={inputRef}
                placeholder="Search news"
                type="text"
                value={searchValue}
                onKeyDown={e => {
                    handleSubmit(e);
                    if (e.keyCode === 27 && searchValue?.length) {
                        clearField();
                    }
                }}
                onChange={e =>
                    handleOnChange({ [keyToChange]: e.target.value })
                }
                className={`outline-none bg-transparent w-full min-h-full placeholder:text-gray-600 ${inputClassName}`}
            />
            <div className="mr-2">
                <RxCross2
                    size="1.5rem"
                    className={`glassy-bg rounded-md hover:bg-black hover:text-white ${
                        searchValue?.length
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => {
                        clearField();
                        inputRef.current?.focus();
                    }}
                />
            </div>
            {render && (render as Function)()}
        </div>
    );
};
