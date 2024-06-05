//  DEPENDENCIAS
import { Navigate } from "react-router-dom";

//  CONTEXT
import { useStateContext } from "../../contexts/ContextProvider";

/**
 * Este método se encarga de controlar
 * que en caso de que el usuario
 * se dirija a una ruta del usuario
 * no pueda visualizar el contenido
 * de ella y sea redirijido al login.
 * @param {children} children
 */
const RequireAuth = ({ children }) => {
    const {token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequireAuth;
