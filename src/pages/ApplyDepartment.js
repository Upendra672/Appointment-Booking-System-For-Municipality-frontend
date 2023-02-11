//add rules afterwords in form-itmes

import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import DepartmentForm from "../components/DepartmentForm";
import moment from "moment";
function ApplyDepartment() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-department-account",
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

  return (
    <Layout>
      <h1 className="page-title">Create Department</h1>
      <hr />
      <DepartmentForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyDepartment;
