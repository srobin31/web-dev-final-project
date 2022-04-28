import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../actions/auth-actions";

import { renderDateStr } from "../../utils/date";

import Nav from "../home/nav";
import ReviewedDrinks from "./reviews";

const Profile = () => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const [profile, setProfile] = useState(stateProfile);
  const [profileFetched, setProfileFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
      setProfileFetched(true);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  useEffect(() => {
    if (!profile && profileFetched) {
      navigate("/login");
    }
  }, [profile, profileFetched, navigate]);

  return (
    <>
      <Nav active="profile" />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {profile && (
              <h4 className="text-warning">
                Member since {renderDateStr(profile.registerDate)}
              </h4>
            )}
          </div>
          <hr />
        </div>
        {profile && <ReviewedDrinks profile={profile} />}
      </div>
    </>
  );
};

export default Profile;
