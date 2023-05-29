import React, { useState } from "react";
import InputField from "../../util/InputField";
// import { Form } from "react-hook-form";
import { Button } from "bootstrap";

const AddProductForm = () => {
  const [inputValue, setInputValue] = useState({ name: "", price: "" });
  const { name, price } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("🚀 ~ file: ProductForm.js:24 ~ handleSubmit ~ e:", inputValue);
    setInputValue({name:"", price:""});
  }

  return (
     <form onSubmit={handleSubmit}>
       <InputField
         type="text"
         value={name}
         placeholder="Product Name"
         label="Name"
         name="name"
         onChange={handleChange}
       />
       <InputField
         type="number"
         value={price}
         placeholder="Add Price"
         label="Price"
         name="price"
         onChange={handleChange}
       />
       <div className="d-grid gap-2 col-6 mx-auto text-center mt-5">
       <button className="btn btn-success" type='submit' >Add</button>
       </div>
     </form>
  );
};

export default AddProductForm;