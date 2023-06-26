import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

export type RouteType = {
  to: string, label: string
}

const Navigator: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let index = routes.findIndex(route => route.to === location.pathname);
    index = index < 0 ? 0 : index
    navigate(routes[index].to)
  }, [routes])

  return <div >
    <nav>
      <ul className="navigator-list">
        {routes.map(route =>
          <li key={route.label} className="navigator-item">
            <NavLink to={route.to}>{route.label}</NavLink>
          </li>)}
      </ul>
    </nav>
    <Outlet></Outlet>
  </div>
}
export default Navigator;