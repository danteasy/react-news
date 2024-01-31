import * as React from "react";

export const Container: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="container max-w-[1200px] w-full mx-auto">
            {children}
        </div>
    );
};
