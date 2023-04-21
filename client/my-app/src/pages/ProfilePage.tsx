import React, { useEffect, useState } from 'react';
import serverAPI from '../utils/serverAPI';
import { ProfileState } from '../types/user';

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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      getUser(accessToken);
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{userState.firstName}</h1>
    </div>
  );
}

export default Profile;