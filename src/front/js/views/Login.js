import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useNavigation } from '@react-navigation/native';
// import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import trip from "../../img/trip.jpg";
import { FaLanguage } from "react-icons/fa";

const Login = () => {
  const style = {
    background: `url(${trip})`, // fondo login
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "75vh",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password, navigate);
  };
  const { store , actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true)
  const navigate = useNavigate();

  return (
    <>
      <section id="login" style={style} >
      {/* <img className="w-100 img-fluid trip" src={trip}/> */}
        <div className="contenedorPrincipal" id="contenedorPrincipal">
          <div className="" id="toAccount">
            {/* agregar link Account 1*/}
            <Link className= "link" to="/account/page/1">
              Don't have an Account? Create an Account!
            </Link>
          </div>
          <div className="container-main col-md-5 col-12 m-auto">
            {/* <div className="row justify-content-center "> */}
            {/* <div className="col-5 m-auto"> */}
              <div className=" row text my-3">
                <div className="messageLogin text-center">
                  Log in to your Account
                </div>
              </div>
              <form
              onSubmit={handleSubmit}
              >
                <div className="mx-5 mb-4">
                  <input
                    className="form-control"
                    type="text" //  cambiar type a text estaba en email
                    value={email}
                    name="email"
                    id="emailLogin"
                    placeholder="Enter your Email..."
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mx-5 mb-5">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="form-control"
                    id="passwordLogin"
                    placeholder="Enter your Password..."
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="m-5 text-center">
                  <button
                    // type="submit"
                    className="btn" style={{backgroundColor:'#336b87', color:'white'}}
                   
                  >
                    Login
                  </button>
                </div>
              </form>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
