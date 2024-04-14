import { createContext } from "react";

const AuthContext = createContext({
    mainInfos : [],
    isLoggedIn : false,
    token : null,
    userInfos : [],
    login : () => {},
    logout : () => {}
});

export default AuthContext