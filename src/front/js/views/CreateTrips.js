import React, { useState, useEffect,useContext } from "react";
import "../../styles/createtrips.css";
import { Context } from "../store/appContext";
// import { Context } from "../store/appContext";

const CreateTrips = () => {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [state, setState] = useState([]);
  const { store, actions } = useContext(Context);
  const user_id = store.currentUser?.user?.id;

  // const [selectedState, setSelectedState] =useState("")

  const getCountry = async () => {
    const response = await fetch(url);
    console.log(response);
    const res = await response.json();
    console.log(res);
    setCountries(res);
  };
  const mostrar_capital = async () => {
    console.log(selected);
    try {
      const resCapital = await fetch(
        `https://restcountries.com/v3.1/name/${selected}?fullText=true`
      );
      console.log(resCapital);
      const getinfo = await resCapital.json();
      const infoPais = getinfo[0];
      console.log(infoPais);
      const y = infoPais.capital;
      console.log(y);
      setState(y);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (event) => {
    const paisseleccionado = event.target.value;
    if (paisseleccionado != "-1") {
      console.log(paisseleccionado);
      setSelected(paisseleccionado);
      mostrar_capital();
    } else {
      setSelected("");
      setState([]);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    mostrar_capital();
  }, [selected]);

  const handleCreateTrip = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();

    //validate date
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    if (start_date >= end_date) {
      console.log("error");
      alert("The end date must be greater than the start date");
      return;
    }

    const sampleForm = document.getElementById("create");

    //Add an event listener to the form element and handler for the submit an event.
    sampleForm.addEventListener("submit", async (e) => {
      /**
       * Prevent the default browser behaviour of submitting
       * the form so that you can handle this instead.
       */
      e.preventDefault();

      /**
       * Get the element attached to the event handler.
       */
      let form = e.currentTarget;

      /**
       * Take the URL from the form's `action` attribute.
       */
      let url = `${process.env.BACKEND_URL}/users/${user_id}/create`;

      try {
        /**
         * Takes all the form fields and make the field values
         * available through a `FormData` instance.
         */
        let formData = new FormData(form);

        /**
         * The `postFormFieldsAsJson()` function in the next step.
         */
        let responseData = await postFormFieldsAsJson({ url, formData });

        //Destructure the response data
        let { serverDataResponse } = responseData;

        //Display the response data in the console (for debugging)
        console.log(serverDataResponse);
      } catch (error) {
        //If an error occurs display it in the console (for debugging)
        console.error(error);
      }
    });

    /**
     * Helper function to POST data as JSON with Fetch.
     */
    async function postFormFieldsAsJson({ url, formData }) {
      //Create an object from the form data entries
      let formDataObject = Object.fromEntries(formData.entries());
      // Format the plain form data as JSON
      let formDataJsonString = JSON.stringify(formDataObject);

      //Set the fetch options (headers, body)
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
        body: formDataJsonString,
      };

      //Get the response body as JSON.
      //If the response was not OK, throw an error.
      let res = await fetch(url, fetchOptions);

      //If the response is not ok throw an error (for debugging)
      if (!res.ok) {
        let error = await res.text();
        throw new Error(error);
      }
      //If the response was OK, return the response body.
      window.location = "/mytrips";
      return res.json();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
        window.location.href = '/login';
}

  return (
    <form id="create" onSubmit={handleCreateTrip}>
      <div className="bigcontainer">
      <a className='nav-link text-danger d-flex justify-content-end' onClick={handleLogout}> Cerrar Sesión</a>

        <h1>CREATE YOUR TRIP</h1>
        <div className="container-trip col-10">
          <div className="destination">
            <h4>Amazing! Which country do you want to travel?</h4>
            <select
              className="custom-select "
              onChange={(event) => handleChange(event)}
              name="country_trip"
            >
              <option value="-1">Selecciona...</option>
              {countries.length > 0 &&
                countries
                  .filter((country) => {
                    return (
                      [
                        "Argentina",
                        "Brazil",
                        "Chile",
                        "Colombia",
                        "Mexico",
                        "Greece",
                        "Italy",
                        "Spain",
                        "United Kingdom",
                        "France",
                      ].indexOf(country?.name?.common) != -1
                    );
                  })
                  .sort((a, b) => (a.name.common > b.name.common ? 1 : -1))
                  .map((elem) => {
                    return (
                      <option key={elem.id} value={elem.id}>
                        {elem?.name?.common}
                      </option>
                    );
                  })}
            </select>

            <h4>Choose the city</h4>
            <select className="custom-select " name="capital_trip">
              {state
                // .sort((a, b) => (a.capital > b.capital ? 1 : -1))
                .map((ele) => {
                  return (
                    <option key={ele.id} value={ele.id}>
                      {state}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="trip-date">
            <label>
              <h4>When do you start your trip?</h4>
              <input
                className="starting"
                type="date"
                name="start_date"
                required
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </label>
          </div>

          <label>
            <h4>When do you finish your trip?</h4>
            <input
              className="ending"
              type="date"
              name="end_date"
              required
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </label>
          <div>
            <button
              className="btn-submit btn-primary"
              type="submit"
              value="Save"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTrips;
