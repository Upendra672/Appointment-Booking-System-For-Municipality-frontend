import axios from "axios";
import { Col, Row } from "antd";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import Department from "../components/Department";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading,  } from "../redux/alertsSlice";


function Home() {
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-all-approved-departments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      dispatch(hideLoading());
      if(response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
    }
  };

  useEffect(() => {
    getData();  
  }, []);
  return (
    <Layout>
      <Row gutter={20}>
        {departments.map((department) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Department department={department} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
