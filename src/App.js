import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "@mantine/core";

function App() {
  const [userData, setUserdata] = useState([]);
  const [delMessage, setDelmessage] = useState("");

  const handleChange = (e) => {
    console.log(e.target);
    const { name, checked } = e.target;
    console.log("name", name);
    if (name === "allselect") {
      const checkedvalue = userData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(checkedvalue);
      setUserdata(checkedvalue);
    } else {
      const checkedvalue = userData.map((user) =>
        user.id == name ? { ...user, isChecked: checked } : user
      );
      console.log("checked value", checkedvalue);
      setUserdata(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue = [];
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].isChecked === true) {
        checkedinputvalue.push(parseInt(userData[i].id));
      }
    }

    if (checkedinputvalue.length > 0) {
      console.log("ids to delete-->", checkedinputvalue);
    } else {
      alert("Please select atleast one to update");
    }
    // const responce = await axios.post(
    //   `http://localhost/devopsdeveloper/userdata/deletecheckboxuser`,
    //   JSON.stringify(checkedinputvalue)
    // );
    // setDelmessage(responce.data.msg);
  };

  useEffect(() => {
    const getData = async () => {
      const reqData = await fetch(
        "https://random-data-api.com/api/v2/users?size=10"
      );
      const resData = await reqData.json();
      console.log(resData);
      setUserdata(resData);
    };
    getData();
  }, []);
  return (
    <div className="App">
      <h1>delete multiple rows</h1>
      <button
        onClick={() => {
          handlealldelete();
        }}
      >
        Block all
      </button>
      <Table withBorder withColumnBorders>
        <tbody>
          <tr>
            <th>
              <input
                type="checkbox"
                name="allselect"
                checked={!userData.some((user) => user?.isChecked !== true)}
                onChange={handleChange}
              />
              Select all
            </th>
            <th>Sr. No</th>
            <th>id</th>
            <th>firstname</th>
            <th>email</th>
            <th>Action</th>
          </tr>

          {userData.map((user, index) => (
            <tr key={index}>
              <th>
                {" "}
                <input
                  type="checkbox"
                  name={user.id}
                  checked={user?.isChecked || false}
                  onChange={handleChange}
                />
              </th>
              <td>{index + 1} </td>
              <td>{user.id} </td>
              <td>{user.first_name} </td>
              <td>{user.email} </td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
