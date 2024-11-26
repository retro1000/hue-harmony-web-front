import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CUSTOM COMPONENT
import { MatxLoading } from "app/components";
import { backendApi } from "config";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
  role: "GUEST", // Add role to initial state
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user, role } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user, role };
    }
    case "LOGIN": {
      const { user, role } = action.payload;
      return { ...state, isAuthenticated: true, user, role };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null, role: "GUEST" };
    }
    case "REGISTER": {
      const { user, role } = action.payload;
      return { ...state, isAuthenticated: true, user, role };
    }
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {},
  getRole: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate()

  const login = async (username, password, rememberMe) => {
    const response = await axios.post(`${backendApi}/login/validate`, { username:username, password:password, rememberMe:rememberMe });
    const { user, token, role } = response.data;

    localStorage.setItem('token', token)

    dispatch({ type: "LOGIN", payload: { user, role } });
  };

  // const login = async (email, password, rememberMe) => {
  //   const response = await axios.post("/api/auth/login", { email, password });
  //   const { user, token, role } = response.data;

  //   localStorage.setItem("token", token);

  //   dispatch({ type: "LOGIN", payload: { user, token, role } });
  //   return role;
  // };

  const getRole = async () => {
    return initialState.role;
  }

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", {
      email,
      username,
      password,
    });
    const { user, token } = response.data;

    localStorage.setItem("token", token);

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate('/')
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const { data } = await axios.get("/api/auth/profile");
    //     dispatch({
    //       type: "INIT",
    //       payload: { isAuthenticated: true, user: data.user, role: "ADMIN" },
    //     });
    //   } catch (err) {
    //     console.error(err);
    //     dispatch({
    //       type: "INIT",
    //       payload: { isAuthenticated: false, user: null, role: "GUEST" },
    //     });
    //   }
    // })();
    (async () => {
        const token = localStorage.getItem('token');
        if(token){
          await axios.get(`${backendApi}/login/profile/view`, {headers: {'Authorization':`Bearer ${token}`}})
            .then((res) => {
              if(res.status===200){
                const { user, role } = res.data
                dispatch({ type: "INIT", payload: { isAuthenticated: true, user: user, role: role } });
              }
            })
            .catch((err) => {
              dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null, role: "GUEST" } });
            });
        }else{
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null, role: "GUEST" } });
          localStorage.removeItem('token')
        }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: "JWT", login, logout, register, getRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
