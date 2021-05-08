const ProductDetails = () => {
    const item = JSON.parse(localStorage.getItem("item"));
    console.log(item);
      return (
        item && 
        <div className="container">
            <h1 className="text-center" style={{color: "red"}}>Product Details</h1>
            <div className="row mt-5">
                <div className="col-12" style={{background: item.bgColor}}>
                <h1>Product: {item.name}</h1>
                <p>Price: {item.price}</p>
                </div>
            </div>
        </div>
      )
  }

  export default ProductDetails;