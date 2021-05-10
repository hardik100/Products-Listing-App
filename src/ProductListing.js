import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import {withRouter} from "react-router";

const data = [
    {
      id: 1,
      name: "macbook air",
      price: "3333$",
      bgColor: "lightyellow",
    },
    {
      id: 2,
      name: "macbook pro",
      price: "4444$",
      bgColor: "lightgreen",
    }
    ,
    {
      id: 3,
      name: "iphone-12",
      price: "4444$",
      bgColor: "grey",
    }
  ]

const ProductListing = (props) => {
    const [items, setItems] = useState(data);
    const [oneItem, setOneItem] = useState({
      id: "",
      name: "",
      price: "",
      bgColor: ""
    });
    const [show, setModal] = useState(false);
  
    const handleClick = (item) => {
        console.log("dsfsf",item);
        setModal(true);
        setOneItem(item);
    }
  
    const handleClose = () => setModal(false);
  
    const handleChange = (e) => {
      console.log("values", e.target.value)
      setOneItem({...oneItem,
                [e.target.name]: e.target.value})
    }
  
    const handleSubmit = () => {
      const index = items.findIndex(i => {
        return oneItem.id == i.id;
      })
     console.log(index)
     items[index] = {
       ...oneItem
     }
     setItems(items);
    setModal(false);
    }
  
   const handleShowDetail = (item) => {
    localStorage.setItem("item",JSON.stringify(item));
     props.history.push('/productDetails')
    }
  
    return (
      <div className="container">
          <h1 className="text-center" style={{color: "red"}}>Product Listing</h1>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Product:
        </label>
        <input name="name" type="text" value={oneItem.name} onChange={handleChange} />
        <label>
          Price:
        </label>
        <input name="price" type="text"  value={oneItem.price} onChange={handleChange} />
        <label>
          Background:
        </label>
        <input name="bgColor" type="text" value={oneItem.bgColor} onChange={handleChange}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="row mt-5">
    {items.map(item => {
      return (
        <div className="col-4 p-5" onClick={() => handleClick(item)} style={{background: item.bgColor}}>
          <h1>Product : {item.name}</h1>
          <p>Price: {item.price}</p>
          <button className="button btn btn-primary" onClick={() => handleShowDetail(item)}>Item details</button>
        </div>
      )
    })
  }
  </div>
    </div>
    )
  }
  
 export default withRouter(ProductListing);