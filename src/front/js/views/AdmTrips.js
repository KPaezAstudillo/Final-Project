import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import "../../styles/mytrip.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { RiChatHeartFill } from "react-icons/ri";
import { FaSuitcase } from "react-icons/fa";

const Mytrips = () => {
  const [trip, setTrip] = useState([]);
  const { store, actions } = useContext(Context);
  const user_id = store.currentUser?.user?.id;

  // Agregar fetch GET
  useEffect(() => {
    if (user_id !== null) getTrip();
  }, [user_id]);

  const getTrip = async () => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/${user_id}/createtrips`
    );
    console.log(store);
    console.log(response);
    const res = await response.json();
    console.log(res);
    setTrip(res.createtrips);
  };

  const DeleteTrip = async (data) => {
    let fetchOptions = {
      //HTTP method set to POST.
      method: "POST",
      //Set the headers that specify you're sending a JSON body request and accepting JSON response
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // POST request body as JSON string.
      body: {},
    };

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/trip/${data}/delete`,

      fetchOptions
    );
    const res = await response.json();
    console.log(res);
    getTrip();
  };

  const functionDisabled = (end_date) => {
    const myDate = new Date(end_date);
    const today = new Date();
    console.log("fecha", myDate, today);
    if (today >= myDate) {
      console.log("if");
      return (
        <button className="btn-delete btn-warning" disabled={true}>
          <Link className="text-decoration-none text-dark" to="/users/poll">
            <RiChatHeartFill /> Rate your partner
          </Link>
        </button>
      );
    } else ""
  };

  // const functionMatch = (end_date) => {
  //   const myDate = new Date(end_date);
  //   const today = new Date();
  //   console.log("fecha", myDate, today);
  //   if (today >= myDate) {
  //     console.log("if2");
  //     return "";
  //   } else {
  //     console.log("else2");
  //     return (
  //       <button className="btn-find btn-success">
  //         <Link className="text-decoration-none text-white mt-2" to="/matches">
  //           <BsFillPeopleFill /> Find Matches
  //         </Link>
  //       </button>
  //     );
  //   }
  // };

  return (
    <div className="full-account1 ">
      <div className="container my-4">
        <div className="row justify-content-between">
          <div className="col-md-6 col-12">
            <h1 className="ms-0">Trips</h1>
          </div>
          <div className="col-md-4 col-12 ">
            <div className=" mx-auto mt-2">
              <Link className="link" to={`/users/${user_id}/createtrip`}>
                Create my trips
              </Link>
            </div>
            <div>
            <button className="btn-find btn-success mt-3">
          <Link className="text-decoration-none text-white" to="/matches">
            <BsFillPeopleFill /> Find Matches
          </Link>
        </button>
        </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="mb-5 ">
            {!!trip &&
              trip.map((item, index) => {
                return (
                  <div className="card-trip rounded-2 mb-4">
                    <div className="row">
                      <div className="col header text-center">
                        <h4 className="card-header ">{item.capital_trip}</h4>
                      </div>

                      <div className="row">
                        <div className="capital ">
                          <h5 className="card-title text-center mt-2">
                            {item.country_trip}
                          </h5>
                          <p className="card-text text-center">
                            {item.start_date} / {item.end_date}
                          </p>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="btn my-auto">
                          {/* {functionMatch(item.end_date)} */}
                          {/* <button className="btn-find btn-success">
                          <Link
                              className="text-decoration-none text-white"
                              to="/matches"
                            >
                            <BsFillPeopleFill /> Find Matches
                            </Link>
                          </button> */}
                          <button
                            onClick={() => DeleteTrip(item.id)}
                            className="btn-delete btn-danger m-1"
                          >
                            <MdDeleteForever /> Delete trip
                          </button>
                          {/* <button className="btn-delete btn-warning" disabled={functionDisabled(item.end_date)}>
                            <Link
                              className="text-decoration-none text-dark"
                              to="/users/poll"
                            >
                              <GrConfigure /> Rate your partner
                            </Link>
                          </button> */}
                          <button className="btn-find btn-primary m-1">
                            <Link
                              className="text-decoration-none text-white"
                              to="/recommendations"
                            >
                              <FaSuitcase /> Recommendations
                            </Link>
                          </button>
                          {functionDisabled(item.end_date)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mytrips;
