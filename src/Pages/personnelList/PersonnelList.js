import React from "react";
import "./PersonnelList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import {
  deletePersonnelCall,
  getPersonnelsCall,
} from "../../context/personnelContext/PersonnelApiCalls";

const PersonnelList = () => {
  const { personnels, dispatch } = useContext(PersonnelContext);

  useEffect(() => {
    getPersonnelsCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deletePersonnelCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "personnel",
      headerName: "Title",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img src={params.row.img} alt="" className="productListImage" />
            {params.row.title || "N/A"}
          </div>
        );
      },
    },
    { field: "fullName", headerName: "Name", width: 250 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/personnel/" + params.row._id}
              state={{ personnel: params.row }}
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
        rows={personnels}
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

export default PersonnelList;
