import React, { useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const inputRef = useRef()
    const [isVisible, setIsVisible] = useState(false);
    const [form , setForm] = useState({site:"",username:"",password:""})
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
          setPasswordArray(passwords)
     }

    useEffect(()=>{
      getPasswords()
      // let passwords = localStorage.getItem("passwords");
      // if(passwords){
      //     setPasswordArray(JSON.parse(passwords))
      // }
      
    },[])

    const showPassword = () =>{
        setIsVisible(!isVisible)
        if(isVisible){
            inputRef.current.type = "password"
        }else{
            inputRef.current.type = "text"
        }
    }

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    const saveData = async () =>{

        //if id is already exists then delete it for edit mode
        await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type" :"application/json"}, body:JSON.stringify({ id: form.id})})
        setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
        await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type" :"application/json"}, body:JSON.stringify({...form, id:uuidv4()})})
        setForm({site:"",username:"",password:""})
    }

    const handleEdit = (id) =>{
        setForm({...passwordArray.filter(item =>item.id === id)[0], id:id})
        setPasswordArray(passwordArray.filter(item =>item.id != id)); 
    }

    const handleDelete = async (id) =>{
        setPasswordArray(passwordArray.filter(item =>item.id != id)); 
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item =>item.id != id)))
        let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type" :"application/json"}, body:JSON.stringify({ id})})
    }

  return (
    <div className="w-[70%] mx-auto my-5 p-3 ">
      <div className="headings p-2 text-center">
        <div className="px-4  font-bold text-3xl">
          <span className="text-green-500">&lt; </span>
          Pass<span className="text-green-500">Op </span>
          <span className="text-green-500">/&gt;</span>
        </div>
        <h6>Your Own Password Manager</h6>
      </div>
      <div className="inputs text-center">
        <div>
          <input
            value={form.site}
            className="w-full rounded-full px-2 py-1 border border-green-500"
            type="text"
            id="site"
            name="site"
            placeholder="enter your url"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="flex gap-8 my-3 relative">
          <input
            value={form.username}
            className="w-1/2 rounded-full px-2 py-1 border border-green-500"
            type="text"
            id="username"
            name="username"
            placeholder="enter username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            value={form.password}
            className="w-1/2 rounded-full px-2 py-1 border border-green-500"
            type="password"
            ref={inputRef}
            id="password"
            name="password"
            placeholder="enter password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {isVisible ? (
            <div
              className="absolute top-1 right-2"
              onClick={() => {
                showPassword();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15 13.5L16.5 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 11L22 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 13L4 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13.5L7.5 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div
              className="absolute top-1 right-2"
              onClick={() => {
                showPassword();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#000000"}
                fill={"none"}
              >
                <path
                  d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div>
          <button
            className="bg-green-500 rounded-full py-1 px-3"
            onClick={() => saveData()}
          >
            Save
          </button>
        </div>
      </div>

      {/* table section */}
      <div className="data my-3">
        <p className="my-2">Your data :</p>
        {passwordArray.length === 0 && <div>No data to show </div>}
        {passwordArray.length > 0 &&  <table className="table-auto w-full border border-green-800">
          <thead className="bg-green-800 text-white">
            <tr>
              <th>Url</th>
              <th>Username</th>
              <th>Password</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {passwordArray.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center w-32">{item.site}</td>
                  <td className="text-center w-32">{item.username}</td>
                  <td className="text-center w-32">{item.password}</td>
                  <td className="text-center w-32">
                    <button className="p-1 bg-green-500 rounded-xl w-fit m-1 hover:cursor-pointer" onClick={()=>{handleEdit(item.id)}}>Edit</button>
                    <button className="p-1 bg-green-500 rounded-xl w-fit m-1 hover:cursor-pointer" onClick={()=>{handleDelete(item.id)}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> }
       
      </div>
    </div>
  );
}

export default Manager;
