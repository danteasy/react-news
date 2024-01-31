import React from "react";
import { Link } from "react-router-dom";

interface IButtonProps {
    to: string | Function;
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}

export const Button: React.FC<IButtonProps> = ({
    to,
    children,
    className,
    ...props
}) => {
    const btnStyles = `px-3 py-1 rounded-md transition-colors text-white bg-black hover:bg-gray-800 ${className}`;
    const renderButton = (): JSX.Element => {
        switch (typeof to) {
            case "function": {
                return (
                    <button
                        className={btnStyles}
                        onClick={() => to()}
                        {...props}
                    >
                        {children}
                    </button>
                );
            }
            case "string": {
                if (to.startsWith("/")) {
                    return (
                        <Link className={btnStyles} to={to} {...props}>
                            {children}
                        </Link>
                    );
                } else {
                    return (
                        <a className={btnStyles} href={to} {...props}>
                            {children}
                        </a>
                    );
                }
            }
        }
    };
    return renderButton();
};
