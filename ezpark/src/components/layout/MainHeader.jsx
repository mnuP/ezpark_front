import React from "react"

const MainHeader = () => {
	return (
		<header className="header-banner">
			<div className="overlay"></div>
			<div className="animated-texts overlay-content">
				<h1>
					Bienvenido a <span className="hotel-color"> EzParking</span>
				</h1>
				<h4>La mejor experiencia de parqueo</h4>
			</div>
		</header>
	)
}

export default MainHeader