import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProfile } from "../../actions/auth-actions";
import {
  getMostPopularUsers,
  getMostRecentReviews,
} from "../../services/ratings-service";
import { getUserBasicInfo } from "../../services/users-service";

import { renderDateStr } from "../../utils/date";

import Search from "./search";
import Nav from "./nav";
import RecentReview from "./review";
import Card from "./card";

const Home = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);
  const [mostPopularUsers, setMostPopularUsers] = useState([]);
  const [mostRecentReviews, setMostRecentReviews] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  useEffect(() => {
    const fetchMostPopularUsers = async () => {
      const users = await getMostPopularUsers();
      if (users) {
        const userDetails = await Promise.all(
          users.map(async (user) => {
            const { fullName, registerDate } = await getUserBasicInfo(
              user._id
            ).then((res) => {
              return { fullName: res.fullName, registerDate: res.registerDate };
            });
            return { ...user, fullName: fullName, registerDate };
          })
        ).then((res) => res);
        setMostPopularUsers(userDetails);
      }
    };

    const fetchMostRecentReviews = async () => {
      const reviews = await getMostRecentReviews(profile._id);
      setMostRecentReviews(reviews);
    };

    if (profile) {
      fetchMostRecentReviews();
    } else {
      fetchMostPopularUsers();
    }
  }, [profile]);

  const renderUserCards = () => {
    return mostPopularUsers.map((user) => {
      const cardInfo = {
        headerLink: `/profile/${user._id}`,
        headerText: user.fullName,
        body: <h4 className="mb-0">{`${user.count} Reviews`}</h4>,
        footer: `Registered ${renderDateStr(user.registerDate)}`,
      };
      return (
        <div className="col-4" key={user._id}>
          <Card {...cardInfo} />
        </div>
      );
    });
  };

  const renderReviewCards = () => {
    return mostRecentReviews.length > 0
      ? mostRecentReviews.map((review) => (
          <RecentReview profile={profile} review={review} key={review._id} />
        ))
      : "No reviews yet :(";
  };

  return (
    <div>
      <Nav active="home" />
      <div className="container">
        <div className="text-center mt-3 mb-5">
          <img
            className="d-inline"
            src="cocktail-clipart.png"
            alt="cocktail-clipart"
            height={150}
          />
          <h1 className="d-inline align-middle">Cocktail Ratings</h1>
          <img
            className="d-inline"
            src="cocktail-clipart.png"
            alt="cocktail-clipart"
            height={150}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
        <Search />
        <div className="row mt-4">
          <div className="col-12">
            <h3>{profile ? "Your Recent Reviews" : "Featured Users"}</h3>
          </div>
        </div>
        <div className="row my-2">
          {profile ? renderReviewCards() : renderUserCards()}
        </div>
        <div className="row my-4">
          <div className="col-12 text-center">
            <h6>{profile ? "" : "Login to start reviewing drinks!"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
