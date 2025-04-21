import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import axios from 'axios';
const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: '', email: '',phone: '', website: '',street: '',city: '',state: '',zip: '',
  });
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5000/api/getProfile', {
            params: { email: user.email },
          });
          const profileData = response.data;
          setProfile((prevProfile) => ({
            ...prevProfile,
            ...profileData,
            email: user.email || '',
          }));
        } catch (error) {
          console.error('Error', error);
        }
      }
    });
  }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/updateProfile', profile);
      alert('successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed');
    }
  };
  return (
    <div className="page-wrapper">
      <div className="profile-container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" />
                    </div>
                    <h5 className="user-name">{profile.fullName}</h5>
                    <h6 className="user-email">{profile.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="mb-2 text-primary">Personal Details</h6>
                <div className="row gutters">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="website">Website URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        value={profile.website}
                        onChange={handleChange}
                        placeholder="Website URL"
                      />
                    </div>
                  </div>
                </div>
                <h6 className="mb-2 text-primary">Address</h6>
                <div className="row gutters">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="street">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        value={profile.street}
                        onChange={handleChange}
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={profile.city}
                        onChange={handleChange}
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={profile.state}
                        onChange={handleChange}
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="zip">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        value={profile.zip}
                        onChange={handleChange}
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right mt-3">
                  <button
                    type="button"
                    id="cancel"
                    name="cancel"
                    className="btn btn-secondary p-2 m-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-primary p-2 m-2"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;