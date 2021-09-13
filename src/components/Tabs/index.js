import React from 'react';
import { useLocation, Link } from "react-router-dom";
import ROUTES from "common/Routes";
import classNames from "classnames";

import './style.scss'

const Tabs = ({ className }) => {
    const location = useLocation();
    const routes = {
        Ensemble: ROUTES.ENSEMBLE,
        Tablature: ROUTES.TABLATURE,
        Navigator: ROUTES.NAVIGATOR,
        Chords: ROUTES.CHORDS,
        Visualization: ROUTES.SCALENET,
        About: ROUTES.ABOUT,
        Account: ROUTES.ACCOUNT,
    };

    return (
        <nav className={`workspace__navwrap ${className}`}>
            <ol className="workspace__nav">
            {Object.entries(routes).map((nameroute) => {
                return (
                    <li
                        className={classNames("workspace__navitem", nameroute[0], {
                            "workspace__navitem--on": location.pathname === nameroute[1],
                        })}>
                        <Link to={nameroute[1]}>
                            <div className={`icon ${nameroute[0]}`}/>
                            <div>{nameroute[0]}</div>
                        </Link>
                    </li>
                );
            })}
            </ol>
        </nav>
    );
}

export default Tabs;
