import React from "react";
import { useNavigate } from "react-router-dom";

function Department({department}) {
    const navigate = useNavigate();
  return (
    <div className="card p-2 cursor-pointer my-card-style" onClick={()=> navigate(`/book-appointment/${department._id}`)}>
      <h1 className="card-title-7">{department.departmentName}</h1>
      <hr />
      <p>
        <b>Phone Number :</b> {department.phoneNumber}
      </p>
      <p>
        <b>Address :</b> {department.address}
      </p>
      <p>
        <b>Fess per document : </b>{department.minFee}
      </p>
      <p>
        <b>
          Timings : </b>{department.timings[0]} - {department.timings[1]}
      </p>
    </div>
  );
}

export default Department;
