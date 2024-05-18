import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						La mejor experiencia te la da <span className="park-color">EzParking</span>
					</h1>
					<h3>Somos el mejor sistema de parqueo de Colombia</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax