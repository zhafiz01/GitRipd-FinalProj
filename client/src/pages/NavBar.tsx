import { FC } from "react"
import { NavLink } from "react-router-dom"
import "./NavBar.css"

const NavBar: FC = () => {
	return (
		<nav className="navbar">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Home Icon
			</NavLink>
			<NavLink
				to="/add-workout"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				Add Icon
			</NavLink>
			<NavLink
				to="/workout-plan"
				className={({ isActive }) =>
					isActive ? "navlink active" : "navlink"
				}
			>
				List Icon
			</NavLink>
		</nav>
	)
}

export default NavBar