import React, { useState } from "react";

function MyStore() {
  // State to manage which modal is open
  const [currentModal, setCurrentModal] = useState(0); // 0: none, 1: first, 2: second, 3: third

  // Handle opening modals
  const openModal = (modalNumber) => {
    setCurrentModal(modalNumber);
  };

  // Handle closing modals
  const closeModal = () => {
    setCurrentModal(0);
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col text-center mt-10 min-h-72">
        <h2 className="text-2xl font-bold">My Store is Empty</h2>
        <p>There are no items listed.</p>
        <button
          onClick={() => openModal(1)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          List an item
        </button>
      </div>
      {/* ///////////////////////////////////first model */}
      {currentModal === 1 && (
        <div>
          {/* <!-- Main modal --> */}
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full 
                md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                  </h3>
                  {/* close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
                      ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                          focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                          focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                          focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>
                  </div>


                  <button
                    onClick={() => openModal(2)}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                       focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                        dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                    Next
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ////////////////////////////////////////////////////////////second model */}
      {currentModal === 2 && (
        <div>
          {/* <!-- Main modal --> */}
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full 
      md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Product
                  </h3>
                  {/* close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
              ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product name"
                        required=""
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                   focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></textarea>
                    </div>

                    {/* image drop zone          */}
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <button
                onClick={() => openModal(1)}
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Previous
              </button>
                  <button
                    onClick={() => openModal(3)}
                    type="button"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Next
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ////////////////////////////////////////////////third model */}
      {currentModal === 3 && (
           <div>
           {/* <!-- Main modal --> */}
           <div
             id="crud-modal"
             tabIndex="-1"
             aria-hidden="true"
             className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full 
       md:inset-0 h-[calc(100%-1rem)] max-h-full"
           >
             <div className="relative p-4 w-full max-w-md max-h-full">
               {/* <!-- Modal content --> */}
               <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                 {/* <!-- Modal header --> */}
                 <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                     Create New Product
                   </h3>
                   {/* close button */}
                   <button
                     type="button"
                     onClick={closeModal}
                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
               ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                     data-modal-toggle="crud-modal"
                   >
                     <svg
                       className="w-3 h-3"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 14 14"
                     >
                       <path
                         stroke="currentColor"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                       />
                     </svg>
                     <span className="sr-only">Close modal</span>
                   </button>
                 </div>
                {/* <!-- Modal body --> */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product name"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        required=""
                      />
                    </div>
                  </div>
                  <button
                onClick={() => openModal(2)}
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Previous
              </button>
                  <button
                    type="button"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                    List Item
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStore;
