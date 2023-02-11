import axios from "axios";
import { Table } from "antd";
import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import moment from "moment";
function Appointments()
{
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async() => {
        try {
          dispatch(showLoading());
          const response = await axios.get("/api/user/get-appointment-by-user-id", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if (response.data.success) {
            setAppointments(response.data.data);
          }
        } catch (error) {
          dispatch(hideLoading());
        }
      };
    const onClick = async()=>{}     
      useEffect(() => {
        getAppointmentsData();
        // eslint-disable-next-line
      }, []);
      const columns = [
        {
            title:"Id",
            dataIndex:"_id"
        },
        {
          title: "Department",
          dataIndex: "departmentName",
          render:(text, record)=>(
            <span>
              {record.departmentInfo.departmentName}
            </span>
          )
        },
        {
          title: "Phone Number",
          dataIndex: "phoneNumber",
          render:(text, record)=>(
            <span>
              {record.departmentInfo.phoneNumber}
            </span>
          )
        },
        {
          title: "Date & Time",
          dataIndex: "createdAt",
          render:(text, record)=>(
            <span>
              {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("hh:mm")}
            </span>
          )
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        // }
      ];
    return(
<Layout>
      <h1 className="page-header">Appointment Lists</h1>
      <Table columns={columns} dataSource={appointments}></Table>
      {/* <button onClick={onClick}>Cancel</button> */}
    </Layout>
    )
}
export default Appointments;