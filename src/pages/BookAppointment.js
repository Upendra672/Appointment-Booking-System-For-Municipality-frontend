// incomplete for booking with valid details and

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Col, Modal, DatePicker, Row, TimePicker } from "antd";
import AppointmentSlip from "../components/AppointmentSlip";
function BookAppointment(props) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [department, setDepartment] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [visible,setVisible] = useState(false);

  function disabledHours() {
    const nonWorkingHours = [];
    for (let i = 0; i < 10; i++) {
      nonWorkingHours.push(i);
    }
    for (let i = 17; i < 24; i++) {
      nonWorkingHours.push(i);
    }
    return nonWorkingHours;
  }

  const disabledDate = current => {
    return (
      current &&
      (current < moment().startOf('day') || current.day() === 0)
    );
  };

  const getDepartmentData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/department/get-department-info-by-id",
        {
          departmentId: params.departmentId,
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

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          departmentId: params.departmentId,
          userId: user._id,
          departmentInfo: department,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success  ) {
        navigate('/appointments')
        console.log(response.data.error);
        toast.success(response.data.message);
        setAppointment(response.data.data);
        setVisible(true)
      }
    } catch (error) {
      console.log(error);
      toast.error("error booking appointment");
      dispatch(hideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          departmentId: params.departmentId,
          date: date,
          time: time,
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
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDepartmentData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {department && (
        <div>
          <h1 className="page-title">{department.departmentName}</h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-book-now-in-banner-style-png-image_5683712.png"
                alt="booknow img"
                width="100%"
                height="100%"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings: </b>
                {department.timings[0]} - {department.timings[1]}
              </h1>
              <p>
                <b>Phone Number :</b> {department.phoneNumber}
              </p>
              <p>
                <b>Address :</b> {department.address}
              </p>
              <p>
                <b>Fess per document : </b>
                {department.minFee}
              </p>

              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                disabledDate={disabledDate}
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  minuteStep={15}
                  disabledHours={disabledHours}
                  defaultValue={moment("10", "HH:mm")}
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                    setIsAvailable(false);
                  }}
                />
                {!isAvailable && <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
            {/* <Col span={8} sm={24} xs={24} lg={8}>
              <img src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-book-now-in-banner-style-png-image_5683712.png" alt="booknow img" />
            </Col> */}
          </Row>
          <Modal
        title="Appointment Slip"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        {appointment ? <AppointmentSlip appointment={appointment} /> : null}
      </Modal>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
