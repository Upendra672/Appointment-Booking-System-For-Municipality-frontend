import axios from "axios";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import moment from "moment";

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();

  const getDepartmentsData = async() => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-departments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDepartmentStatus = async(record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-department-account-status",
        { departmentId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDepartmentsData();
      }
    } catch (error) {
      toast.error("Error changing the department status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDepartmentsData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Department Name",
      dataIndex: "departmentName",
      render:(text, record)=>(
        <span>
          {record.departmentName} {record.phoneNumber}
        </span>
      )
    },
    {
      title: "Specilization",
      dataIndex: "specilization",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),

    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && 
            <h1
              className="anchor"
              onClick={() => changeDepartmentStatus(record, 'approved')}
            >
              Approve
            </h1>
          }
          {record.status === "approved" && 
            <h1
              className="anchor"
              onClick={() => changeDepartmentStatus(record, 'blocked')}
            >
              Block
            </h1>
          }
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Department Lists</h1>
      <Table columns={columns} dataSource={departments}></Table>
    </Layout>
  );
}

export default DepartmentsList;
