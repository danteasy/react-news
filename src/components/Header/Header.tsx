import React from "react";

import { Logo, NavBar } from "../../exports";

export interface IHeaderProps {}

export const Header: React.FC = (props: IHeaderProps) => {
    return (
        <header className="flex items-center justify-between my-2">
            <Logo clickable={true} />
            <NavBar />
        </header>
    );
};
