import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"

const Header = () => {
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)

	const handleLogout = async () => {
		await signOut(auth)
		navigate("/login")
	}

	return (
		<div className="header">
			{user && (
				<button
					className="navlink"
					onClick={handleLogout}
				>
					Log Out
				</button>
			)}
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				<FontAwesomeIcon
					style={{ fontSize: "41px" }}
					icon={faUser}
				/>
			</NavLink>
		</div>
	)
}

export default Header
