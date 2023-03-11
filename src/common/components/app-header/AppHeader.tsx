import React from "react";
import logo from "../../../assets/images/logo.png"
import "./AppHeader.styles.css"

interface AppHeaderProps {
    onClick: () => void
}

const AppHeader: React.FC<AppHeaderProps> = ({ onClick }) => {
    return (
        <header className="app-header">
            <div className="container">
                <img onClick={onClick} src={logo} alt={"logo"} />
                <div className="app-description">
                    Movie application that allows users to easily add and share movies with friends, family, and other movie enthusiasts
                </div>
            </div>
        </header>
    )
}

export default AppHeader