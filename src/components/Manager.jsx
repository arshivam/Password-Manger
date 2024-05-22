import React from "react";

function Manager() {
  return (
    <div className="w-[70%] mx-auto my-5 p-3 ">
      <div className="headings p-2 text-center">
      <div className='px-4  font-bold text-3xl'>
          <span className='text-green-500'>&lt; </span>
          Pass<span className='text-green-500'>Op </span>
         <span className='text-green-500'>/&gt;</span>
         </div>
        <h6 >Your Own Password Manager</h6>
      </div>
      <div className="inputs text-center">
        <div>
          <input
            className="w-full rounded-full px-2 py-1 border border-green-500"
            id="site"
            name="site"
            placeholder="enter your url"
          />
        </div>
        <div className="flex gap-8 my-3">
          <input
            className="w-1/2 rounded-full px-2 py-1 border border-green-500"
            id="username"
            name="username"
            placeholder="enter username"
          />
          <input
            className="w-1/2 rounded-full px-2 py-1 border border-green-500"
            id="password"
            name="password"
            placeholder="enter password"
          />
        </div>
        <div>
          <button className="bg-green-500 rounded-full py-1 px-3">Save</button>
        </div>
      </div>

      {/* table section */}
      <div className="data my-3">
        <p className="my-2">Your data :</p>
        <table class="table-auto w-full border border-green-800">
  <thead className="bg-green-800 text-white">
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="text-center w-32">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td className="text-center w-32">Malcolm Lockyer</td>
      <td className="text-center w-32">1961</td>
    </tr>
    <tr>
      <td className="text-center w-32">Witchy Woman</td>
      <td className="text-center w-32">The Eagles</td>
      <td className="text-center w-32">1972</td>
    </tr>
    <tr>
      <td className="text-center w-32">Shining Star</td>
      <td className="text-center w-32">Earth, Wind, and Fire</td>
      <td className="text-center w-32">1975</td>
    </tr>
  </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manager;
