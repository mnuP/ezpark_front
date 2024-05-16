import React, { useEffect, useState } from "react"
import { deleteUserByEmail, getAllReservas, getUserByEmail } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const Profile = () => {
	const [user, setUser] = useState({
		id:"",
		nombre:"",
        apellido:"",
        email:"",
	})
       
	const [bookings, setBookings] = useState([])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUserByEmail(userId, token)
				setUser(userData)
			} catch (error) {
				setErrorMessage("Error fetching user data.")
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getAllReservas(userId, token)
				setBookings(response)
			} catch (error) {
				setErrorMessage("Error fetching booking data.")
				console.error(error)
			}
		}

		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
			.then((response)=>{
				setMessage(response.data)
				localStorage.removeItem("token")
				localStorage.removeItem("userId")
				localStorage.removeItem("userRole")
				navigate("/")
				window.location.reload()
			})
			.catch((error) => {
				setErrorMessage("Error deleting user account.")
				console.error(error)
			})
		}
	}

	return (
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">Información del Usuario</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card_body">
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label fw-bold">Email:</label>
                                    <div className="col-md-10">
                                        <p className="card-text">{user.email}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
						</div>
					</div>
				</div>
			) : (
				<p>Cargando datos de usuario...</p>
			)}
		</div>
	)
}

export default Profile
