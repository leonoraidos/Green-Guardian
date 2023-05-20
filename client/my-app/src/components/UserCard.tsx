import React from 'react';
import { ProfileState } from '../types/user';
import profile from '../assests/1756804-200.png'

type UserCardProps = {
  user: ProfileState;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="userCard">
      <h1 className="userName">{user.firstName}</h1>
      <img src={profile} alt="Profile Icon" className="navicons" id='usericon'></img>
    </div>
  );
};

export default UserCard;
