import React from 'react';
export const Loading = () => {
    return(
        <div style={{height: "100vh"}}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="text-center">
                    <span className="fa fa-spinner fa-puyarn lse fa-3x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <img src="images/JaiInsta-Logo.png" alt="Jai-Logo"/>
                    <h1 className="light-font">Photo Sharing App</h1>
                </div>
            </div>
        </div>
    )
}