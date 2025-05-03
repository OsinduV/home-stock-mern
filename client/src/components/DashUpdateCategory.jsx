// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import DashSidebar from "./DashSidebar";

// const DashUpdateCategory = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     category_name:""
//   });

//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       //   try {
//       //     const response = await axios.get(`http://localhost:5000/api/v1/category/all-category/by-id/${id}`);
//       //       // "/api/v1/products/all-inventory/by-id/" + id
//       //     //);

//       //     if (response && response.data) {
//       //       const result =  response.data;
//       //       setCategory_Name(result.data.category_name);
//       //       console.log(result.data);

//       //     }
//       //   } catch (error) {
//       //     console.log(error);
//       //   }
//       // };

//       // const response = await axios.get(`http://localhost:5000/api/v1/category/all-category/by-id/${id}`);
//       const response = await fetch(
//         `http://localhost:5000/api/v1/category/all-category/by-id/${id}`,
//         {
//           method: "GET",
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         setCategory_Name(result.data.category_name);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const validate = () => {
//     const newErrors = {};
//     if (!category_name.trim()) newErrors.category_name = "Name is required";

//     return newErrors;
//   };

//   const updateData = async (e) => {
//     //e.preventDefault();
//     try {
//       const update = await axios.put(
//         `http://localhost:5000/api/v1/category/update-category/${id}`,
//         { category_name: category_name }
//       );

//       if (update) {
//         alert("update successful.");
//         navigate("/dashboard?tab=category");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   const handleChange = (e) => {
//   //     setName(e.target.value);
//   //     setCategory(e.target.value);
//   //     setQunatity(e.target.value);
//   //     setPrice(e.target.value);
//   //     setDescription(e.target.value);

//   //   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   updateData();

//   //   const validationErrors = validate();
//   //   setError(validationErrors);

//   //   if (Object.keys(validationErrors).length === 0) {
//   //     try {
//   //       updateData();

//   //       //const data = await res.json();

//   //       if (!res.ok) {
//   //         setError(data.message || "Something went wrong");
//   //         setLoading(false);
//   //         return;
//   //       }
//   //       navigate("/dashboard?tab=category");
//   //       setLoading(false);
//   //       setError(null);
//   //       setFormData({}); // Clear form data
//   //       navigate("/dashboard?tab=category-list"); // Redirect to the Inventory page
//   //     } catch (error) {
//   //       setLoading(false);
//   //       setError("Network error. Please check your connection and try again.");
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       const validationErrors = validate();
//       setError(validationErrors);

//        if (Object.keys(validationErrors).length === 0) {
//          try {
//            setLoading(true);
//            const update = await axios.put(
//             `http://localhost:5000/api/v1/category/update-category/${id}`,
//             { category_name: category_name })

//           const data = await res.json();
//           console.log('Response Data:', data);

//           if (!res.ok) {
//             setError({ general: data.message || "Something went wrong" });
//             setLoading(false);
//             toast.error(data.msg);
//             return;
//           }

//           setLoading(false);
//           setFormData({
//             category_name: "",

//           });
//           toast.success("Category added successfully!");
//           setTimeout(() => {
//             navigate("/dashboard?tab=category");
//           }, 1000);
//         } catch (error) {
//           setLoading(false);
//           setError({ general: "Network error. Please check your connection and try again." });
//           toast.error("Network error. Please check your connection and try again.");
//         }
//       }
//   };

//   const handleChange = (e) => {
//     setCategory_Name({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-gray-800">
//         <DashSidebar />
//       </div>

//       {/* Main Content */}
//       <div
//         className="flex-1 bg-gray-300 bg-cover bg-center p-6"
//         style={{
//           backgroundImage: "url('/images/i1_background.jpg')",
//           backgroundOpacity: 0.5,
//           transition: "0.5s",
//         }}
//       >
//         <div className="max-w-lg p-5 mx-auto">
//           <h1 className="text-3xl font-semibold text-center my-7 text-red-600">
//             Update Category
//           </h1>

//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             {/* Name */}
//             <input
//               type="text"
//               className="p-3 border rounded-lg"
//               id="category_name"
//               //   placeholder={name}
//               value={category_name}
//               onChange={handleChange}
//             />
//             {error?.name && <p className="text-red-500">{error.name}</p>}

//             {/* Category */}

//             {/* Created At
//         <input
//           type="text"
//           className="p-3 border rounded-lg bg-gray-100"
//           //value={formData.createdAt}
//           placeholder={}

//         /> */}

//             {/* Updated At */}
//             {/* <input
//           type="text"
//           className="p-3 border rounded-lg bg-gray-100"
//           value={formData.updatedAt}

//         /> */}

//             {/* Submit Button */}
//             {/* <button
//           type="submit"
//           className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
//           // disabled={loading}
//           // aria-disabled={formData}
//         >
//           {loading ? "Loading..." : "Add Inventory"}
//         </button> */}
//             <input
//               type="submit"
//               value={"Update Category"}
//               className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
//             />
//           </form>

//           {error && <p className="text-red-500 mt-3">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashUpdateCategory;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DashSidebar from "./DashSidebar";

const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    // category_id: "",
    category_name: "",
  });

  const { id } = useParams();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    //if (!formData.category_id.trim()) newErrors.category_id = "ID is required";
    if (!formData.category_name.trim())
      newErrors.category_name = "Category Name is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/v1/category/update-category/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        console.log("Response Data:", data);

        if (!res.ok) {
          setError({ general: data.message || "Something went wrong" });
          setLoading(false);
          toast.error(data.msg);
          return;
        }

        setLoading(false);
        setFormData({
          category_id: "",
          category_name: "",
        });
        toast.success("Category added successfully!");
        setTimeout(() => {
          navigate("/dashboard?tab=category");
        }, 1000);
      } catch (error) {
        setLoading(false);
        setError({
          general: "Network error. Please check your connection and try again.",
        });
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  useEffect(()=>{
    const getCategoryData = async()=>{
      try{
        const response = await fetch(`http://localhost:5000/api/v1/category/all-category/by-id/${id}`,{
          method:"GET"
        })

        const result = await response.json();

        if(response.ok){
          setFormData(result.data)
          console.log(result);
        }
      }catch(error){
        console.log(error);
      }
    }

    getCategoryData();
  },[])

  return (
    <div className="flex">
      <DashSidebar />
      <div
        className="w-full max-w-screen-xl mx-auto p-6 min-h-screen bg-gray-300 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/i1_background.jpg')",
          backgroundOpacity: 0.5,
          transition: "0.5s",
        }}
      >
        <div className="max-w-lg p-3 mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7 text-yellow-300">
            Update Category
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {[
              // { id: "category_id", type: "text", placeholder: "ID" },
              {
                id: "category_name",
                type: "text",
                placeholder: "Category Name",
              },
            ].map(({ id, type, placeholder }) => (
              <div key={id}>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="p-3 border rounded-lg w-full"
                  id={id}
                  value={formData.category_name}
                  onChange={(e) =>
                    setFormData({ ...formData, category_name: e.target.value })
                  }
                />
                {error[id] && <p className="text-red-500">{error[id]}</p>}
              </div>
            ))}

            {/* <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.createdAt}
          placeholder="Created Date"
          id="created_date"
          readOnly
        />

        <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.updatedAt}
          readOnly
        /> */}

            <button
              type="submit"
              className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
              disabled={loading}
              //  onClick={handleSubmit}
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
            <ToastContainer />
          </form>

          {error.general && (
            <p className="text-red-500 mt-3">{error.general}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddInventoryForm;
