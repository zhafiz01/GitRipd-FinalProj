import { FC } from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHouse,
	faPlus,
	faDumbbell,
} from "@fortawesome/free-solid-svg-icons"

const NavBar: FC = () => {
	return (
		<nav className="navbar">
			<NavLink
				to="/dashboard"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				<FontAwesomeIcon
					style={{ fontSize: "46px" }}
					icon={faHouse}
				/>
			</NavLink>
			<NavLink
				to="/select"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				<FontAwesomeIcon
					style={{ fontSize: "46px" }}
					icon={faPlus}
				/>
			</NavLink>
			<NavLink
				to="/plans"
				className={({ isActive }) =>
					isActive ? "navlink-active" : "navlink"
				}
			>
				<FontAwesomeIcon
					style={{ fontSize: "46px" }}
					icon={faDumbbell}
				/>
			</NavLink>
		</nav>
	)
}

export default NavBar
