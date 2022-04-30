import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getProfile } from "../../actions/auth-actions";
import { getUserById } from "../../services/users-service";

import { renderDateStr } from "../../utils/date";

import Nav from "../home/nav";
import ReviewedDrinks from "./reviews";

const Profile = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);
  const [profileFetched, setProfileFetched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
      setProfileFetched(true);
    }
    async function fetchOtherUser(userId) {
      const user = await getUserById(userId);
      setProfile(user);
    }
    const userId = params.uid;
    if (userId) {
      fetchOtherUser(userId);
    } else {
      fetchProfile();
    }
  }, [dispatch, params]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile, params]);

  useEffect(() => {
    if (!profile && profileFetched) {
      navigate("/login");
    }
  }, [profile, profileFetched, params, navigate]);

  return (
    <>
      <Nav active="profile" />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h1>Profile{profile && `: ${profile.fullName}`}</h1>
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
