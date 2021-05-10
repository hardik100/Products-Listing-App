import React, {useState, useEffect} from "react";
import {TableServices} from "./tableServices";
import {Modal, Button} from "react-bootstrap";

const TableList = () => {
const [list, setData] = useState(null);
const [openModal, setModal] = useState(false);
const [errorScreen, setErrorScreen] = useState(false);
const [errorMsg, setErrorMsg] = useState("");
const [oneItem, setItem] = useState({
    employee_name: "",
    employee_salary: "",
});
useEffect(() => {
    getList();
}, [])

    const getList = () => {
        TableServices.tableLists().then(data => {
           setData(data)
        }, error => {
            setErrorScreen(true);
            setErrorMsg(error);
        })
    }

    const handleClick = (id) => {
        setModal(true);
        TableServices.getOne(id).then(data => {
            setItem(data);
            console.log("oneItem", data)
        }, error => {
            setErrorScreen(true);
            setErrorMsg(error);
        })
    }


const handleDelete = (id) => {
    TableServices.deleteOne(id).then(data => {
        console.log("deleted", data)
    }, error => {
        setErrorScreen(true);
            setErrorMsg(error);
    })
}

const handleUpdate = () => {
    const params = {
    id: oneItem.id,
    employee_name: oneItem.employee_name,
    employee_salary: oneItem.employee_salary
    }
    TableServices.updateItem(params).then(data => {
        console.log("updated");
    }, error => {
        setErrorScreen(true);
            setErrorMsg(error);
    })
}

const handleClose = () => setModal(false);

const handleChange = (e) => {
    setItem({...oneItem, 
        [e.target.name]: e.target.value})
}
    return (
        <>
   {errorScreen ? 
        <div>
            {errorMsg}
        </div>
     :
    <div>
    <Modal show={openModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          name:
        </label>
        <input name="employee_name" type="text" value={oneItem.employee_name} onChange={handleChange} />
        <label>
          salary:
        </label>
        <input name="employee_salary" type="text"  value={oneItem.employee_salary} onChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
            <table className="table">
                <thead>
                    <tr>
                    <td>id</td>
                    <td>employee name</td>
                    <td>employee age</td>
                    <td>employee salary</td>
                    <td>profile image</td>
                    <td>delete</td>
                    </tr>
                </thead>
                <tbody>
                    {list && 
                        list.map(i => {
                            return (
                                <tr key={i.id}>
                            <td>{i.id}</td>
                            <td onClick={() => handleClick(i.id)}>{i.employee_name}</td>
                            <td>{i.employee_age}</td>
                            <td>{i.employee_salary}</td>
                            <td><img src={i.profile_image} alt="profile" /></td>
                            <td><button className="button btn btn-primary" onClick={() => handleDelete(i.id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
 }
 </> )
}

export default TableList;