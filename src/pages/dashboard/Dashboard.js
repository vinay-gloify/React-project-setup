import {React, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getRequest, putRequest } from '../../services/api';
import { setProfile } from '../../redux/slices/profileSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profile);
  const [data,setData] = useState([])


  const getApiCall = async() => {
    const dataApi = await getRequest('users');
    if(dataApi.status === 200){
      toast.success('Success');
      dispatch(setProfile(dataApi.data));
      setData(dataApi.data);
    }else{
      toast.error(dataApi.message);
    }
  };

  const postApiCall = async() => {
    let person = {
      title:'react',
      body:'JSX'
    }
    const dataApi = await putRequest('posts/1', person);
    if(dataApi.status === 200){
      toast.success('Success');
      dispatch(setProfile(dataApi.data));
      setData(dataApi.data);
    }else{
      toast.error(dataApi.message);
    }
  };

  return (
    <div>
      <p>Dashboard</p>
        {<p>{data[0]?.name || profileData.title}</p>}
        {<p>{profileData[0]?.email || profileData.body}</p>}
      <button className='btn btn-info me-5' onClick={getApiCall}>Get Api call</button>
      <button className='btn btn-info' onClick={postApiCall}>Post Api call</button>
    </div>
  )
}

export default Dashboard