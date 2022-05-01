import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getProfile } from "../../actions/auth-actions";
import { getUserById, updateEmail } from "../../services/users-service";

import { renderDateStr, getBirthday, getAge } from "../../utils/date";

import Nav from "../home/nav";
import ReviewedDrinks from "./reviews";

const Profile = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);
  const [profileFetched, setProfileFetched] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

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
  }, [dispatch, params, ]);

  useEffect(() => {
    setProfile(stateProfile);
    if (stateProfile) {
      setNewEmail(stateProfile.email);
    }
  }, [stateProfile, params]);

  useEffect(() => {
    if (!profile && profileFetched) {
      navigate("/login");
    }
  }, [profile, profileFetched, params, navigate]);

  const error = (msg) => {
    setEditEmail(false);
    setNewEmail(profile.email);
    alert(msg);
  };

  const handleEmailChange = () => {
    if (newEmail === profile.email) {
      setEditEmail(false);
    } else if (newEmail === "") {
      error("Email cannot be blank.");
    } else {
      const updatedEmail = {
        userId: profile._id,
        email: newEmail,
      };
      updateEmail(updatedEmail)
        .then((res) => {
          if (res.error) {
            error(res.error);
          } else {
            setEditEmail(false);
            setProfile({ ...profile, email: newEmail });
          }
        });
    }
  };

  const renderEmail = () => {
    if (!editEmail) {
      return (
        <>
          {profile.email}
          <i
            type="button"
            className="fas fa-pen float-end lh-base"
            onClick={(e) => {
              setEditEmail(!editEmail);
            }}
          ></i>
        </>
      );
    } else {
      return (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={handleEmailChange}>
              Save
            </button>
          </div>
        </div>
      );
    }
  };

  const renderPersonalInfo = () => {
    return (
      <div className="row">
        <div className="col-5">
          <p>
            <button
              className="btn btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accountInfo"
              aria-expanded="false"
              aria-controls="accountInfo"
              onClick={(e) => {
                if (!showPersonalInfo) {
                  setEditEmail(false);
                }
                setShowPersonalInfo(!showPersonalInfo);
              }}
            >
              {`${showPersonalInfo ? "Show" : "Hide"} Personal Information`}
            </button>
          </p>
          <div className="collapse" id="accountInfo">
            <div className="card card-body border-info">
              <table className="table card-table mb-0  border-info">
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>{profile && renderEmail()}</td>
                  </tr>
                  <tr>
                    <td>Birthday</td>
                    <td>{profile && getBirthday(profile.dob)}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{profile && getAge(profile.dob)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        </div>
        {params.uid ? <></> : renderPersonalInfo()}
        <hr />
        {profile && <ReviewedDrinks profile={profile} />}
      </div>
    </>
  );
};

export default Profile;
