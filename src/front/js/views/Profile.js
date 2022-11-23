import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { Context } from "../store/appContext";
import { FaStar } from "react-icons/fa";
import { BsTagFill } from "react-icons/bs";
import { BsFillPencilFill } from 'react-icons/bs';
import user_profile from "../../img/user_profile.png";
import logo from "../../img/logo.png"
import "../../styles/profile.css";

const Profile = () => {
  const [photoUser, setPhotoUser] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUser, setImageUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(logo);
  const { store, actions } = useContext(Context);
  const [rating, setRating] = useState([]);
  const [tags1, setTags1] = useState([]);
  const [calificacion, setCalificacion] = useState(7)



  // const user_id = store.currentUser?.user?.id;

  useEffect(() => {
    console.log(store.currentUser);
    if (store.currentUser) getImageUser(); getImagesGallery(); getRating(); promedio(rating)
  }, []);

  useEffect(() => {
    console.log(store.currentUser);
    if (store.currentUser) getImageUser(); getImagesGallery(); getRating();
  }, [store.currentUser]);
  useEffect(() => {
    console.log(rating);
    if (rating.length !== 0) promedio(rating); etiquetas(rating)
  }, [rating]);

  const etiquetas = (rating) => {
    let labels = ['Funny', 'Love Adventures', 'Relax', 'Good Talking', 'Good at History', 'Great Dancer'].sort();
    let lista = [];
    let unicosElementos=[];
    let almacenadorDeVecesRepetidas = [];
    let contador = 1;
    console.log(labels)
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < rating.length; j++) {
        if (rating[j].reason_good === labels[i]) {
          lista.push(labels[i]);
        } }
        console.log(lista);
      }  
    let lista2 = lista.sort()
    for (let k = 0; k < lista2.length; k++) {
          if (lista2[k+1] === lista2[k]) {
            console.log("se repite la etiqueta"+ lista2[k]);
            contador++;
         } else{
          unicosElementos.push(lista2[k]);
          almacenadorDeVecesRepetidas.push(contador);
          contador = 1;
         }
        }
        console.log(unicosElementos);
        console.log(almacenadorDeVecesRepetidas);
      
        setTags1(unicosElementos);

      }

    
  
  const promedio = () => {
    if (rating.length > 0) {
      let sum = 0;
      var b = rating.length;
      for (let i = 0; i < b; i++) {
        sum = (sum + ((rating[i].good_match + rating[i].recommend) / 2));
      }
      let prom = sum / b;
      setCalificacion(prom);
    }
  }

  const getRating = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/users/${store?.currentUser?.user?.id}/rating`
      );
      console.log(response);
      const data = await response.json();
      console.log(data.rating)
      setRating(data.rating);
    } catch (error) {
      console.log(error.message);
    }
  };

  // trae foto usuario
  const getImageUser = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/userpictures/${store?.currentUser?.user?.id}`
      );
      console.log("ahora hay img");
      console.log(response);
      const data = await response.json();
      setPhotoUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // actualiza foto usuario
  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (imageUser !== null) {
      const formData2 = new FormData();
      console.log(user_id);
      formData2.append("user_id", user_id);
      formData2.append("image", imageUser[0]);
      console.log(formData2);
      uploadImage2(formData2);
      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };
  // actualiza foto usuario
  const uploadImage2 = async (user_id, formData2) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/userpictures/${user_id}`,
        {
          method: "PUT",
          body: formData2,
        }
      );

      if (response.status == 200)
        getImageUser()

      // const data = await response.json();

      // if (data.length > 0) {
      //   getImageUser(filter);
      //   setImage(null);
      //   setError(null);
      // } else {
      //   setError("Error uploading image");
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  // trae fotos galeria
  const getImagesGallery = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/galleries/${store.currentUser?.user?.id}`
      );
      const data = await response.json();

      setGallery(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // actualiza fotos galeria
  const handleSubmit = (e) => {
    e.preventDefault();

    if (image !== null) {
      console.log(image);
      const formData = new FormData();
      formData.append("user_id", user_id);
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
      console.log(formData);
      uploadImage(formData);
      setError(null);
      e.target.reset();
    } else {
      setError("Please, complete the form");
    }
  };

  // actualiza fotos galeria
  const uploadImage = async (formData) => {
    console.log("uploadImage");
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/galleries/${user_id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      console.log("esperandorespuesta data", data);

      if (data.length > 0) {
        getImagesGallery();
        setImage(null);
        setError(null);
      }
    } catch (error) {
      console.log("catch error upload image");
      setError("Error uploading image");
      console.log(error.message);
    }
  };
  const createTrip = async () => {

    window.location = `/users/${store.currentUser?.user?.id}/createtrip`
  }
  return (

    <div className="ContainerPrincipal">

      <div className="container my-4">
        <h1 className="text-center">{store?.currentUser?.user?.firstname}'s Profile</h1>
        <div className="row principal">
          <div className="container1 col-lg-6">
            <div className="">
              <div className="mx-0 mt-0  mb-2 py-0 px-0">
                <h4 className="text-center my-0" style={{ color: '#336b87' }}>{store?.currentUser?.user?.firstname} {store?.currentUser?.user?.lastname}</h4>

              </div>
              <div className="containerPhoto d-inline-flex">
                {photoUser ? (
                  <div className="photoUser m-auto" >
                    <div className="photoUser1 position-relative" key={photoUser.id}>
                      <img
                        src={photoUser.filename}
                        className="photo img-thumbnail"
                        alt="..."
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="edit d-inline ">
                  <span className="pe-0">
                    < BsFillPencilFill className="editPhoto" />
                  </span>
                </div>
              </div>
            </div>
            <div className="infogen ">
              <ul>
                <li>Gender:  <strong>{store?.currentUser?.user?.gender}</strong> </li>
                <li>Native Language: <strong>{store?.currentUser?.user?.languages}</strong> </li>
                <li>Country of residence: <strong>{store?.currentUser?.user?.countryofresidence}</strong></li>
                <li>Instagram: <strong>{store?.currentUser?.user?.instagram}</strong></li>
                <li>Facebook: <strong>{store?.currentUser?.user?.facebook}</strong></li>
                <li>Twitter: <strong>{store?.currentUser?.user?.twitter}</strong></li>
                <li>Rating:  <FaStar />{calificacion}/7</li>
              </ul>
            </div>

            <div className="row label">
              <div className="tags px-5" style={{ color: '#336b87' }}>
                <BsTagFill />
                <a href="#" className="card-link" >
                  {tags1[0]}
                </a>
                <BsTagFill />
                <a href="#" className="card-link">
                {tags1[1]}
                </a>
                <BsTagFill />
                <a href="#" className="card-link">
                {tags1[2]}
                </a>
              </div>
            </div>

            {/* <div className="row matches">
              <div className="col matches">
                <div className="card">
                  <div className="card-header">
                    <img style={{ width: "3rem" }}
                      className="card-img-top"
                      src={user_profile}
                      alt="Card image cap"
                    /> Name match</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p >
                        A well-known quote, contained in a blockquote element.
                      </p>
                      <footer className="blockquote-footer">
                        Calification given{" "}
                        <cite title="Source Title">6/7</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div> */}

          </div>

          <div className="container2 col-lg-6">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end me-md-5">

            </div>
            <div className="d-flex justify-content-evenly">
              <h4 className="mt-0">
                My trips
              </h4>
              <button type='button' style={{ backgroundColor: '#336b87', color: 'white' }} className='btn mb-3 me-md-2 ' onClick={createTrip} >Create Trip</button>
            </div>
            <div className="Gall">
              <div className="cont">
                <img src={selectedImg} alt="Selected" className="selected" />
                <div className="imgContainer">
                  {!!gallery &&
                    gallery.map((img, index) => {
                      return (
                        <img
                          style={{ border: selectedImg === img.filename ? "4px solid #89bed3" : "" }}
                          key={index}
                          src={img.filename}
                          onClick={() => setSelectedImg(img.filename)}
                          alt="..."
                        />


                      );
                    })}
                </div>
              </div>
            </div>
            {/* <div className="row-galeria d-flex">
            {!!gallery &&
              gallery.map((image, index) => {
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <div className="card mx-2 rounded-3">
                      <img
                        src={image.filename}
                        className="card-photos img-fluid img-thumbnail rounded-3"
                        alt="..."
                      />
                    </div>
                  </div>
                );
              })}
          </div> */}
          </div>

          {/* <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Upload Image File
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {!!error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="py-3">Please fill form to upload image.</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files)}
                  multiple
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-sm gap-2">Upload</button>
              </div>
            </form> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;