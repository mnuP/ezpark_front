import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingParqueaderos from "./components/parqueadero/ExistingParqueaderos"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditParqueadero from "./components/parqueadero/EditParqueadero"
import AddParqueadero from "./components/parqueadero/AddParqueadero"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import ParqueaderoListing from "./components/parqueadero/ParqueaderoListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/reserva/Checkout"
import ReservaSuccess from "./components/reserva/ReservaSuccess"
import Reservas from "./components/reserva/Reservas"
import BuscarReserva from "./components/reserva/BuscarReserva"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import EspacioListing from "./components/parqueadero/EspacioListing"



function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-parqueadero/:roomId" element={<EditParqueadero/>} />
						<Route path="/existing-parqueadero" element={<ExistingParqueaderos/>} />
						<Route path="/add-parqueadero" element={<AddParqueadero />} />
						<Route
							path="/reserva-parqueadero/:idParqueadero"
							element={
								<EspacioListing />
								/*<Checkout />*/							
							}
						/>
						<Route
							path="/reserva-espacio/:id"
							element={
								<Checkout />						
							}
						/>
						<Route path="/browse-all-parking-spots" element={<ParqueaderoListing/>} />

						<Route path="/admin" element={<Admin />} />
						<Route path="/Reserva-success" element={<ReservaSuccess />} />
						<Route path="/existing-bookings" element={<Reservas />} />
						<Route path="/find-booking" element={<BuscarReserva />} />

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />


						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<BuscarReserva />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App
