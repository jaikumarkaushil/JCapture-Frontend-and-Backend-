import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
export const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-cover bg-[url('assets/images/loading_bg.jpg')]" style={{ height: "100vh" }} >

            <div className="text-center">
                <span className="fa fa-spinner fa-puyarn lse fa-3x fa-fw text-primary"></span>
                <p className="font-['Open_Sans'] text-lg">Loading</p>
                <PropagateLoader
                    color="#00008B"
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            <div className="loading-brand">
                <img src="images/JaiInsta-no_bg_logo.png" alt="Jai-Logo" />
                <h1 className="font-['Open_Sans'] text-lg text-sky-800 text-center">Aspiring Photos</h1>
            </div>

        </div>
    )
}