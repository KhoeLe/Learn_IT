import React, { Fragment } from 'react';
import { useSelector,  } from 'react-redux';
import Loader from 'react-loader-spinner';

import {  userSelector } from 'features/UserSlice';

const Dashboard = () => {
  // const history = useHistory();

  // const dispatch = useDispatch();
  const { isFetching,  } = useSelector(userSelector);

//   useEffect(() => {
//     dispatch(fetchUserBytoken({ token: localStorage.getItem('learning-mern') }));
//   }, []);

  const { username} = useSelector(userSelector);



  return (
    <div className="container mx-auto">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div className="container mx-auto ">
            Welcome back <h3>{username}</h3>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
