import React, { useEffect, useState } from 'react';
import serverAPI from '../utils/UserAPI';
import { ProfileState } from '../types/user';
import PlantList from '../components/PlantList';
import UserCard from '../components/UserCard';

const profileState: ProfileState = {
  firstName: '',
  lastName: '',
}

type accessToken = string;

function Profile() {

  const [userState, setUserState] = useState<ProfileState>(profileState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getUser = async (accessToken: accessToken) => {
      try {
        setIsLoading(true);
        const user = await serverAPI.profile(accessToken);
        if (user) {
          const {firstName, lastName} = user;
          setUserState((prevState) => {
            return {
              ...prevState,
              firstName,
              lastName,
            };
          });
        } else {
          console.log('User not found')
        }
      } catch (error) {
        console.log('profile get error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      getUser(accessToken);
    }
  }, [])

  if (isLoading) {
    //placeholder for a nicer spinner eventually 
    return <div>Loading...</div>
  }

  return (
    <>
    <div className="profileCard">
      <UserCard user={userState} />

    </div>

    <div className="gardenPlant">
      <p>Your Garden:</p>
      <PlantList />
    </div>

    </>

  );
}

export default Profile;
