import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

//CSS STYLES

const style = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  padding: "0% !important",
};

const rounded = {
  borderRadius: "100%",
  objectFit: "cover",
  width: "280px",
  height: "280px",
  objectPosition: "top",
};

const rounded2 = {
  borderRadius: "100%",
  objectFit: "cover",
  width: "100px",
  height: "auto",
  objectPosition: "top",
};

const OffCanvasBtn = () => {
  return (
    <button
      className="btn btn-sm"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasScrolling"
      aria-controls="offcanvasScrolling"
    >
      Preferences
    </button>
  );
};

const Matches = () => {
  //FETCH FUNCTIONS

  const getAllUsersWithTripsAsync = async () => {
    let url = `${process.env.BACKEND_URL}/users/createtrips`;
    let options_get = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await fetch(url, options_get);
      const data = await response.json();
      console.log(data);
      console.log(data[0]);
      setAllUsers(data);
      setTrips(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWithTripsAsync = async () => {
    let url = `${process.env.BACKEND_URL}/users/1/createtrips`;
    let options_get = {
      method: "GET",

      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await fetch(url, options_get);
      const data = await response.json();
      console.log(data);
      console.log(data);
      setuser_trip(data.createtrips);
      console.log(user_trip);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postMatch = async (match) => {
    try {
      //console.log("attempt to fetch")

      const response = await fetch(`${process.env.BACKEND_URL}/api/matches`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(match),
      });
      const data = await response.json();
      window.location = "/save";
      console.log(data);
      console.log("data posted!");
    } catch (error) {
      console.log(error);
    }
  };

  //GENERAL STATE VARIABLES
  //Fetch user_trip and allusers_trips
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState([]);
  const [user_trip, setuser_trip] = useState([]);
  const [chosen_trip, setChosenTrip] = useState("");
  const [matchData, setMatchData] = useState({});
  const { store, actions } = useContext(Context);
  const user_id = store.currentUser?.user?.id;

  //GET ONLY TRIPS ARRAY FROM CURRENT USER AND ALL USERS

  const onlyAllTrips =
    !!trips &&
    trips.length > 0 &&
    trips.map((elem, i) => {
      return elem.createtrips[0];
    });
  const onlyUserTrips =
    !!user_trip &&
    user_trip.length > 0 &&
    user_trip.map((elem, i) => {
      console.log(elem);
      return elem;
    });

  const userFilter = (elem) => {
    if (
      elem.country_trip === chosen_trip.country_trip &&
      elem.capital_trip === chosen_trip.capital_trip &&
      elem.start_date === chosen_trip.start_date
    ) {
      return elem;
    }
  };

  //MATCHEDUSERS LOADS USERS IN THE SAME TRIP THAN CURRENT USER

  const matchedUsers =
    !!onlyAllTrips &&
    onlyAllTrips.length > 0 &&
    onlyAllTrips.filter(userFilter);
  console.log(matchedUsers);
  //const userAllActivity = activities.filter(userFilter);

  //INDIVIDUAL VARIABLE STATE

  //const [traveling, setTraveling] = useState(0);
  //const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState("");
  //const [activity, setActivity] = useState(1);
  //const [gender, setGender] = useState(1);
  //const [age, setAge] = useState(1);
  //const [stay, setStay] = useState(1);

  //INDIVIDUAL FILTER ARRAYS

  const [travelArr, setTravelArr] = useState([]);
  const [childrenArr, setChildrenArr] = useState([]);
  const [activityArr, setActivityArr] = useState([]);
  const [genderArr, setGenderArr] = useState([]);
  const [ageArr, setAgeArr] = useState([]);
  const [stayArr, setStayArr] = useState([]);
  const [budgetArr, setBudgetArr] = useState([]);

  //FILTER FUNCTIONS

  const handleTravel = (e) => {
    console.log(e.target.value);
    console.log(travelArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.traveling == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };
    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (usertrip.traveling == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (travelArr.length === 0 || travelArr.length > 0) {
      console.log(filter8);
      setTrips(filter8);
      setTravelArr(filter8);
      console.log(filter8);
    }
  };

  const handleChildren = (e) => {
    console.log(e.target.value);
    console.log(childrenArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.children == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (usertrip.children == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (travelArr.length === 0) {
      console.log(filter8);
      setTrips(filter8);
      setChildrenArr(filter8);
      console.log(filter8);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setChildrenArr(filter5);
      console.log(filter5);
    }
  };

  const handleBudget = (e) => {
    console.log(e.target.value);
    setBudget(e.target.value);
    const value = e.target.value;

    const filterFunction = (elem) => {
      if (Math.abs(elem.budget - value) <= 1000) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (Math.abs(usertrip.budget - value) <= 1000) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (travelArr.length === 0 && childrenArr.length === 0) {
      console.log(filter8);
      setTrips(filter8);
      setBudgetArr(filter8);
      console.log(filter8);
    } else if (childrenArr.length > 0) {
      console.log(filter4);
      setTrips(filter4);
      setBudgetArr(filter4);
      console.log(filter4);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setBudgetArr(filter5);
      console.log(filter5);
    }
  };

  const handleActivity = (e) => {
    console.log(e.target.value);
    console.log(activityArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.activity == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip.activity);
      if (usertrip.activity == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (
      travelArr.length === 0 &&
      childrenArr.length === 0 &&
      budgetArr.length === 0
    ) {
      console.log(filter8);
      setTrips(filter8);
      setActivityArr(filter8);
      console.log(filter8);
    } else if (budgetArr.length > 0) {
      console.log(filter7);
      setTrips(filter7);
      setActivityArr(filter7);
      console.log(filter7);
    } else if (childrenArr.length > 0) {
      console.log(filter4);
      setTrips(filter4);
      setActivityArr(filter4);
      console.log(filter4);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setActivityArr(filter5);
      console.log(filter5);
    }
  };

  const handleGender = (e) => {
    console.log(e.target.value);
    console.log(genderArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.gender == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (usertrip.gender == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (
      travelArr.length === 0 &&
      childrenArr.length === 0 &&
      budgetArr.length === 0 &&
      activityArr.length === 0
    ) {
      console.log(filter8);
      setTrips(filter8);
      setGenderArr(filter8);
      console.log(filter8);
    } else if (activityArr.length > 0) {
      console.log(filter3);
      setTrips(filter3);
      setGenderArr(filter3);
      console.log(filter3);
    } else if (budgetArr.length > 0) {
      console.log(filter7);
      setTrips(filter7);
      setGenderArr(filter7);
      console.log(filter7);
    } else if (childrenArr.length > 0) {
      console.log(filter4);
      setTrips(filter4);
      setGenderArr(filter4);
      console.log(filter4);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setGenderArr(filter5);
      console.log(filter5);
    }
  };

  const handleAge = (e) => {
    console.log(e.target.value);
    console.log(ageArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.age == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (usertrip.age == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (
      travelArr.length === 0 &&
      childrenArr.length === 0 &&
      budgetArr.length === 0 &&
      activityArr.length === 0 &&
      genderArr.length == 0
    ) {
      console.log(filter8);
      setTrips(filter8);
      setAgeArr(filter8);
      console.log(filter8);
    } else if (genderArr.length > 0) {
      console.log(filter2);
      setTrips(filter2);
      setAgeArr(filter2);
      console.log(filter2);
    } else if (activityArr.length > 0) {
      console.log(filter3);
      setTrips(filter3);
      setAgeArr(filter3);
      console.log(filter3);
    } else if (budgetArr.length > 0) {
      console.log(filter7);
      setTrips(filter7);
      setAgeArr(filter7);
      console.log(filter7);
    } else if (childrenArr.length > 0) {
      console.log(filter4);
      setTrips(filter4);
      setAgeArr(filter4);
      console.log(filter4);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setAgeArr(filter5);
      console.log(filter5);
    }
  };

  const handleStay = (e) => {
    console.log(e.target.value);
    console.log(stayArr);
    const value = e.target.value;
    const filterFunction = (elem) => {
      if (elem.stay == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filterFunction2 = (elem) => {
      const usertrip = elem.createtrips[0];
      console.log(usertrip);
      if (usertrip.stay == value) {
        return elem;
      } else {
        console.log("no matches!");
      }
    };

    const filter1 = ageArr.filter(filterFunction2);
    const filter2 = genderArr.filter(filterFunction2);
    const filter3 = activityArr.filter(filterFunction2);
    const filter4 = childrenArr.filter(filterFunction2);
    const filter5 = travelArr.filter(filterFunction2);
    const filter6 = stayArr.filter(filterFunction2);
    const filter7 = budgetArr.filter(filterFunction2);
    const filter8 = trips.filter(filterFunction2);

    if (
      travelArr.length === 0 &&
      childrenArr.length === 0 &&
      budgetArr.length === 0 &&
      activityArr.length === 0 &&
      genderArr.length == 0 &&
      ageArr.length == 0
    ) {
      console.log(filter8);
      setTrips(filter8);
      setStayArr(filter8);
      console.log(filter8);
    } else if (ageArr.length > 0) {
      console.log(filter1);
      setTrips(filter1);
      setStayArr(filter1);
      console.log(filter1);
    } else if (genderArr.length > 0) {
      console.log(filter2);
      setTrips(filter2);
      setStayArr(filter2);
      console.log(filter2);
    } else if (activityArr.length > 0) {
      console.log(filter3);
      setTrips(filter3);
      setStayArr(filter3);
      console.log(filter3);
    } else if (budgetArr.length > 0) {
      console.log(filter3);
      setTrips(filter3);
      setStayArr(filter3);
      console.log(filter3);
    } else if (childrenArr.length > 0) {
      console.log(filter4);
      setTrips(filter4);
      setStayArr(filter4);
      console.log(filter4);
    } else if (travelArr.length > 0) {
      console.log(filter5);
      setTrips(filter5);
      setStayArr(filter5);
      console.log(filter5);
    }
  };

  //ADD MATCH SAVE FEATURE

  const savedMatches = [];

  const handleMatch = (id) => {
    //e.preventDefault();

    const filterMatch = trips.filter((elem) => elem.id === id);
    const match = filterMatch[0];
    savedMatches.push(match);
    console.log(savedMatches);
  };

  const showSelected = () => {
    setTrips(savedMatches);
  };

  const saveMatches = () => {
    //console.log(savedMatches);
    //console.log('saved!');
    const postMatches = savedMatches.map((elem, i) => {
      return {
        users_id: user_id,
        match_id: elem.id,
      };
    });

    postMatches.forEach(function (match, i) {
      console.log(match, i);
      postMatch(match);
    });
  };

  //CHOOSE YOUR TRIP FEATURE

  const handleTrip = (id) => {
    console.log("hey!");
    console.log(id);
    const tripArr = user_trip;
    const chosenTripArr = tripArr.filter((elem) => elem.id === id);
    setChosenTrip(chosenTripArr[0]);
    console.log(chosenTripArr[0]);
    console.log(chosen_trip);
  };

  //USEEFFECT

  useEffect(() => {
    getUserWithTripsAsync();
  }, []);

  useEffect(() => {
    getAllUsersWithTripsAsync();
  }, []);

  return (
    <div className="container">
      <div className="mb-1">
        <h1 className="matches_title mb-2">Your Matches!</h1>
        <OffCanvasBtn className="float-end" />
      </div>
      <div className="btn-group mb-1">
        <button
          className="filters_btn btn btn-sm dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select trip
        </button>
        <ul className="dropdown-menu">
          {!!onlyUserTrips && onlyUserTrips.length > 0 ? (
            onlyUserTrips.map((elem, i) => {
              return (
                <li
                  className="trip_list btn p-1 m-0 w-100 border-0 rounded-0 list-item"
                  key={i}
                  onClick={() => handleTrip(elem.id)}
                >
                  <small>
                    {elem.capital_trip}, {elem.country_trip}
                  </small>
                </li>
              );
            })
          ) : (
            <p>No trips added</p>
          )}
        </ul>
      </div>
      <div className="row d-flex mx-auto justify-content-center">
        {!!matchedUsers && matchedUsers.length > 0 ? (
          matchedUsers.map((trip, i) => {
            return (
              <div className="col-3 justify-content-center p-3" key={i}>
                <div className="trip_card card border-0 mb-5">
                  {!!trips && trips.length > 0 ? (
                    trips.map((user, i) => {
                      if (user.id === trip.users_id) {
                        return (
                          <div
                            className="frame mx-auto justify-content-center"
                            key={i}
                          >
                            <a
                              className="mx-auto"
                              href="https://rr.noordstar.me/test-109ddae8"
                            >
                              <img
                                src={user.user_img}
                                className="card-img-top pt-3 mx-auto"
                                alt="..."
                                style={rounded}
                              />
                            </a>
                            <div className="card-body d-flex p-0">
                              <div className="w-100 text-center p-3">
                                <p className="trip_text card-text px-2">
                                  {user.firstname} {user.lastname}
                                </p>
                                <p className="trip_text card-text px-2">
                                  {trip.firstname} goes to {trip.capital_trip},{" "}
                                  {trip.country_trip} on the same date!
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <p className="trip_text card-text px-2">
                      We don't have a name!
                    </p>
                  )}
                  <button
                    className="btn w-25 mx-auto mb-3"
                    onClick={() => handleMatch(trip.id)}
                  >
                    Add Match!
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-md-12 text-center">
            <h4>There are no matches for your trip.</h4>
          </div>
        )}
      </div>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Preferences
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div>
          <div className="img-card card border-0 my-3 justify-content-center">
            <img
              src={user.user_img}
              className="p-0 mx-auto"
              alt="..."
              style={rounded2}
            />
          </div>
          <div className="description-card text-center">
            <a className="mx-auto" href="https://rr.noordstar.me/test-109ddae8">
              <h3>
                {user.firstname} {user.lastname}
              </h3>
            </a>
            <p>From {user.countryofresidence}</p>
          </div>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="col">
              <p>Traveling...</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  key={1}
                  type="radio"
                  onChange={handleTravel}
                  name="travelling"
                  id="inlineRadio1"
                  value={1}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Alone
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  key={2}
                  type="radio"
                  onChange={handleTravel}
                  name="travelling"
                  id="inlineRadio2"
                  value={2}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Couple
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  key={3}
                  type="radio"
                  onChange={handleTravel}
                  name="travelling"
                  id="inlineRadio3"
                  value={3}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  Group
                </label>
              </div>
            </div>

            <div className="col">
              <p>With children?</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="with_children"
                  id="inlineRadio1"
                  onChange={handleChildren}
                  value={1}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="with_children"
                  id="inlineRadio2"
                  onChange={handleChildren}
                  value={2}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  No
                </label>
              </div>
            </div>

            <div className="col mt-3">
              <label htmlFor="customRange1" className="form-label">
                Approximate budget (in US dollars)
              </label>
              <div className="d-flex">
                <input
                  type="range"
                  className="slider form-range w-75 mb-3 in-line"
                  min="50"
                  max="20000"
                  step="1000"
                  id="customRange1"
                  onInput={handleBudget}
                  name="budget"
                  value={budget}
                />
                <label className="form-label in-line ms-4" id="rangeValue">
                  $ {budget}
                </label>
              </div>
            </div>

            <div className="col">
              <p className="w-75">
                Which type of activity do you prefer the most?
              </p>
              <div className="row">
                <div className="col col-md-12">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox1"
                      value={1}
                      onChange={handleActivity}
                      name="activities"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Trekking
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox2"
                      value={2}
                      onChange={handleActivity}
                      name="activities"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Restaurants
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox3"
                      value={3}
                      onChange={handleActivity}
                      name="activities"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      Museums
                    </label>
                  </div>
                </div>
                <div className="col col-md-12">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox4"
                      value={4}
                      onChange={handleActivity}
                      name="activities"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      Disco & Nights Out
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox5"
                      value={5}
                      onChange={handleActivity}
                      name="activities"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      Malls & Shopping
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mt-3">
              <p>Do you prefer a specific gender?</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender_specific"
                  id="inlineRadio1"
                  onChange={handleGender}
                  value={1}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Woman
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender_specific"
                  id="inlineRadio2"
                  onChange={handleGender}
                  value={2}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Man
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender_specific"
                  id="inlineRadio3"
                  onChange={handleGender}
                  value={3}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  I don't believe in binary gender labelling
                </label>
              </div>
            </div>

            <div className="col mt-3">
              <p>Any age in particular for your perfect partner?</p>
              <div className="row">
                <div className="col-md-12 col-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio4"
                      onChange={handleAge}
                      value={1}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio4">
                      18-24
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio5"
                      onChange={handleAge}
                      value={2}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio5">
                      25-31
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio6"
                      onChange={handleAge}
                      value={3}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio6">
                      32-38
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio7"
                      onChange={handleAge}
                      value={4}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio7">
                      39-45
                    </label>
                  </div>
                </div>
                <div className="col-md-12 col-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio8"
                      onChange={handleAge}
                      value={5}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio8">
                      45-51
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio9"
                      onChange={handleAge}
                      value={6}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio9">
                      52-59
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio10"
                      onChange={handleAge}
                      value={7}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio10">
                      60+
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="partner_age"
                      id="inlineRadio11"
                      onChange={handleAge}
                      value={8}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio11">
                      I don't have an age preference
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mt-3">
              <p>Where do you plan to stay?</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stay"
                  id="Radio1"
                  onChange={handleStay}
                  value={1}
                />
                <label className="form-check-label" htmlFor="Radio1">
                  Hotel
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stay"
                  id="Radio2"
                  onChange={handleStay}
                  value={2}
                />
                <label className="form-check-label" htmlFor="Radio2">
                  Apartment/Airbnb
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stay"
                  id="Radio3"
                  onChange={handleStay}
                  value={3}
                />
                <label className="form-check-label" htmlFor="Radio3">
                  Camping
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stay"
                  id="Radio4"
                  onChange={handleStay}
                  value={4}
                />
                <label className="form-check-label" htmlFor="Radio4">
                  I'll stay at someone else's.
                </label>
              </div>
            </div>
          </form>
          <div className="col my-3">
            <button className="btn" onClick={() => setTrips(arr)}>
              Reset
            </button>
            <button className="btn" onClick={showSelected}>
              Show Matches
            </button>
            <button className="save-btn btn" onClick={saveMatches}>
              Save Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
