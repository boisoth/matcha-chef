import React from 'react'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Matcha-Chef</h1>
                <p className="lead">
                    Create a profile/portfolio, share posts and get help from
                    other chefs
                </p>
                <div className="buttons">
                    <a href="register.html" className="btn btn-primary">Sign Up</a>
                    <a href="login.html" className="btn btn-light">Login</a>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;
