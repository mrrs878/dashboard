import React, { useEffect } from 'react';

const User = () => {
  useEffect(() => {
    console.log(111);
  }, []);
  return (
    <div className="container">this is user page</div>
  );
};

export default User;
