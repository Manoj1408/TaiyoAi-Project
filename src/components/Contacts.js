import React, { useState } from "react";
import "./Contacts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addObject,
  removeObject,
  editObject,
} from "../actions/contactActionCreator";

export default function Contacts() {
  const dispatch = useDispatch();
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [active, setActive] = useState();
  let editObj = {};
  const [num, setNum] = useState(null);

  const [show, setShow] = useState(true);

  let data = useSelector((state) => state.objectArray);
  console.log(data);

  function handleChange(e) {
    setActive(e.target.value);
  }

  function addUser() {
    const newObject = {
      id: data.length + 1,
      fname: fname,
      lname: lname,
      status: active,
    };
    dispatch(addObject(newObject));
    // console.log("first");
    setFName("");
    setLName("");
    setActive("");
  }
  function deleteUser(id) {
    // console.log(id);
    dispatch(removeObject(id));
  }

  function editUser(item) {
    setFName(item.fname);
    setLName(item.lname);
    setActive(item.status);
    setNum(item.id);
    console.log(item);
  }
  function updateUser() {
    editObj = {
      id: num,
      fname: fname,
      lname: lname,
      status: active,
    };
    console.log(editObj);
    dispatch(editObject(editObj));
    setFName("");
    setLName("");
    setActive("");
  }
  return (
    <>
      <div className="cmain">
        <h1>Contacts</h1>
        <div className="form">
          {show ? (
            <button onClick={() => setShow(false)}>Create Contact</button>
          ) : (
            <div className="form1">
              <h3>Create Contact Screen</h3>
              <div action="">
                <div>
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    value={fname}
                    onInput={(e) => setFName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    value={lname}
                    onInput={(e) => setLName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Status</label>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    value="Active"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="">Active</label>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    value="Inactive"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="">Inactive</label>
                </div>
                <div>
                  <button onClick={addUser}>Create</button>
                  <button onClick={updateUser}>Update</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {data.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SI.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            onClick={() => {
                              editUser(item);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteUser(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            "No contacts are there"
          )}
        </div>
      </div>
    </>
  );
}
