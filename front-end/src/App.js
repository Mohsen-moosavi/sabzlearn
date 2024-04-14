import { Route, Routes, useRoutes , useLocation } from 'react-router-dom';
import './App.css';
import routes from './routes';
import AuthContext from './contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from './Utils/Variables/ApiVariables';
import changeTheme from './Utils/ChangeTheme/ChangeTheme';

function App() {

  const allRoutes = useRoutes(routes)
  const [mainInfos , setMainInfos] = useState([])
  const [token , setToken] = useState("")
  const [isLoggedIn , setIsLogedIn] = useState(false)
  const [userInfos , setUserInfos] = useState([])
  const location = useLocation()

  const login = (userInfo,token)=>{
    setIsLogedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem("user" , JSON.stringify({token}))
    setToken(token)
  }

  const logout = useCallback(()=>{
    setIsLogedIn(false)
    setUserInfos([])
    setToken(null)
    localStorage.removeItem("user")
  },[])

  useEffect(()=>{
    document.documentElement.scrollTo({top : 0 , left : 0})
  },[location])

  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem("user"))


    if(localStorageData){
      fetch(`${BASE_URL}auth/me`,{
        headers:{
          Authorization : `Beare ${localStorageData.token}`
        }
      }).then(res=>res.json())
      .then(result=>{
        setUserInfos(result)
        setIsLogedIn(true)
        localStorage.setItem('role',result.role)
      })
    }else{
      setIsLogedIn(false)
      setUserInfos([])
      localStorage.removeItem('role')
    }
  },[token , logout])

  useEffect(()=>{
    changeTheme()
      fetch(`${BASE_URL}infos/index`)
      .then(res=>res.json())
      .then(result=>setMainInfos(result))
  },[])


  return (
    <AuthContext.Provider value={{
        mainInfos,
        isLoggedIn,
        token,
        userInfos,
        login,
        logout
    }}>
      {allRoutes}
    </AuthContext.Provider>
    
  );
}

export default App;
