import React, { useState, useEffect } from "react"
import AutoComplete from "../AutoComplete";

export default function ProductList() {
const [data, setData] = useState([]);
const endPoint = "/products"

const [name, setName] = useState('')
const [price, setPrice] = useState(0)
const [id, setId] = useState('')
const [animal, setAnimal] = useState('')

const [keyword, setKeyword] = useState('')

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name, price: price, animal: animal})
       }).then(data => load())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name, price: price, animal: animal})
       }).then(data => load())
   }
 
   }
 
const deleteProduct = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => load())
}
 
const editProduct = (id, name, price) => {
   setId(id)
   setName(name)
   setPrice(price)
}
//get data from api
const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data));
}

function addnew(){
    setId('')
    setName('')
    setPrice(0)
}

function search(){

  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value


  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo)
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function populatePageNo(size){

  const pageSize = document.querySelector("#pageSize").value
  const noPage = size/pageSize
  const pageNoSelect = document.querySelector("#pageNo")
  
  while (pageNoSelect.options.length > 0) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
}
}

//load data automatically
useEffect(() => {
  search()
 }, [])
 
return (
  <div>
      <h2>Product Form</h2>
      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Name:</label><input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Price:</label><input type="number" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)}/> 
      </div>

      <div class="form-group">
      <label>Type:</label>
      <AutoComplete f={a=>setAnimal(a)}
        suggestions={[
          "Alligator",
          "Allofthem",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}
      />
      </div>



      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Product Table</h2>

        <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Page Number: 
            <select id="pageNo" onChange={()=>search()}>
              <option value="1">1</option>
            </select>
            Page Size 
              <select id="pageSize" onChange={()=>search()}>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              </select>
          </div>         
        </div>

       <table class="table table-striped">
       <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.name}</td>
            <td>{a.price}</td>
            <td><button className="btn btn-warning" onClick={()=> deleteProduct(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editProduct(a._id, a.name)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
