import React, { useState } from "react"
import { loginUser } from "../api/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		contraseña: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or contraseña. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleSubmit}>
				<div className="row mb-3">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row mb-3">
					<label htmlFor="contraseña" className="col-sm-2 col-form-label">
						Contraseña
					</label>
					<div>
						<input
							id="contraseña"
							name="contraseña"
							type="contraseña"
							className="form-control"
							value={login.contraseña}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3">
					<button type="submit" className="btn btn-park" style={{ marginRight: "10px" }}>
						Iniciar Sesión
					</button>
					<span style={{ marginLeft: "10px" }}>
						¿No tienes una cuenta?<Link to={"/register"}> Regístrate</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Login
