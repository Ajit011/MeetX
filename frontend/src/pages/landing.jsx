import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2 style={{ color: "#2c3e50", fontWeight: "bold" }}>
                        MeetX <span style={{ color: "red" }}>❤️</span>
                    </h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => { router("/aljk23") }}>Join as Guest</p>
                    <p onClick={() => { router("/auth") }}>Register</p>
                    <div onClick={() => { router("/auth") }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
                    
                    {/* Yahan maine change kar diya hai */}
                    <p>Experience seamless connections with MeetX ❤️</p>
                    
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    )
}