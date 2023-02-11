import axios from "axios";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import moment from "moment";
function DepartmentAppointment()
{
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async() => {
        try {
          dispatch(showLoading());
          const response = await axios.get("/api/department/get-appointments-by-department-id", {
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
      const changeAppointmentStatus = async(record, status) => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "/api/department/change-appointment-status",
            { appointmentId: record._id, userId: record.userId, status: status},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            getAppointmentsData();
          }
        } catch (error) {
          toast.error("Error changing the department status");
          dispatch(hideLoading());
        }
      };
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
          title: "User",
          dataIndex: "name",
          render:(text, record)=>(
            <span>
              {record.userInfo.name} 
            </span>
          )
        },
        {
          title: "Date & Time",
          dataIndex: "createdAt",
          render:(text, record)=>(
            <span>
              {moment(record.date).format("DD-MM-YYYY")} {" "} {moment(record.time).format("HH:mm")}
            </span>
          )
        },
       
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
              <div className="d-flex">
                {record.status === "pending" && (
                    <div className="d-flex">
                <h1
                    className="anchor px-2"
                    onClick={() => changeAppointmentStatus(record, 'cancelled')}
                  >
                    Reschedule
                  </h1>
                  <h1
                    className="anchor"
                    onClick={() => changeAppointmentStatus(record, 'rejected')}
                  >
                    Cancel
                  </h1>
                  </div>
                )}
              
              </div>
            ),
          }
      ];
      useEffect(()=>{
        getAppointmentsData();
      },[])
    return(
<Layout>
      <h1 className="page-header">Appointment Lists</h1>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
    )
}
export default DepartmentAppointment;