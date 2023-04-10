import React from "react";
import "./ServiceList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import {
  deleteServiceCall,
  getServicesCall,
} from "../../context/serviceContext/ServiceApiCalls";

const ServiceList = () => {
  const { services, dispatch } = useContext(ServiceContext);

  useEffect(() => {
    getServicesCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteServiceCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "service",
      headerName: "Service",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img src={params.row.img} alt="" className="productListImage" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 450 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/service/" + params.row._id}
              state={{ service: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r) => r._id}
      />
    </div>
  );
};

export default ServiceList;
