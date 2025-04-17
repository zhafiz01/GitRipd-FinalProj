import { FC } from "react"
import { NavLink } from "react-router-dom"
import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Header: FC = () => {
	return (
		<div className="header">
			<NavLink
				to="/welcome"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				Intake Form
			</NavLink>
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				<FontAwesomeIcon style={{ fontSize: "36px" }} icon={faUser} />
			</NavLink>
		</div>
	)
}

export default Header
