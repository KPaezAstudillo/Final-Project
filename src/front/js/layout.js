import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import Login from "./views/Login";
import Profile from "./views/Profile";
import Account1 from "./views/Account1";
import PhotosAccount from "./views/PhotosAccount";
import Mytrips from "./views/AdmTrips";
import CreateTrips from "./views/CreateTrips";
import SetPreferences from "./views/SetPreferences";
import Poll from "./views/Poll";
import Save from "./views/Save";
import Recommendations from "./views/Recommendations";
import Matches from "./views/Matches";
import AdminView from "./views/AdminView";

import injectContext from "./store/appContext";

// import Navbar  from "./component/navbar";
import Footer  from "./component/footer";
import Jumbo from "./component/jumbo";
import Navbar2 from "./component/navbar2";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename =  "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar2 />
                    <Jumbo />
                    <Routes>
                        <Route path="/login" element={<Login />}/>      
                        <Route path="/account/page/1" element={<Account1 />}/>
                        <Route path="/account/page/2" element={<PhotosAccount />}/>
                        <Route path="/profile" element={<Profile />}/>
                        <Route path="/mytrips" element={<Mytrips />}/>
                        <Route path="/users/:id/createtrip" element={<CreateTrips />}/>
                        <Route path="users/:id/setpreferences/" element={<SetPreferences />}/>
                        <Route path="/users/poll" element={<Poll />}/>
                        <Route path="/save" element={<Save />}/>
                        <Route path="/recommendations" element={<Recommendations />}/>
                        <Route path="/matches" element={<Matches />}/>
                        <Route path="/admin" element={<AdminView />}/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
