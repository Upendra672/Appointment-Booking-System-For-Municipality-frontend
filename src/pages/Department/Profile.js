import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentForm from "../../components/DepartmentForm";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [department, setDepartment] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/department/update-department-profile",
        {
          ...values, 
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("hh:mm"),
            moment(values.timings[1]).format("hh:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDepartmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/department/get-department-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDepartment(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Department Profile</h1>
      <hr />
      {department &&
        <DepartmentForm onFinish={onFinish} initialValues={department} />
      }
    </Layout>
  );
}

export default Profile;
