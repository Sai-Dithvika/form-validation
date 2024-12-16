import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_NO: "",
    Joining_Date: "",
    Role: "",
    Department: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const departments = ["HR", "Engineering", "Marketing", "Finance"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!formData.Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email))
      newErrors.Email = "A valid email is required";
    if (!formData.Phone_NO || !/^\d{10}$/.test(formData.Phone_NO))
      newErrors.Phone_NO = "Phone number must be 10 digits";
    if (!formData.Department) newErrors.Department = "Department is required";
    if (!formData.Joining_Date || new Date(formData.Joining_Date) > new Date())
      newErrors.Joining_Date = "Joining date cannot be in the future";
    if (!formData.Role.trim()) newErrors.Role = "Role is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("https://form-validation-ux77.onrender.com/employees", formData);
      
      setFormData({
        Name: "",
        Email: "",
        Phone_NO: "",
        Joining_Date: "",
        Role: "",
        Department: "",
      });
      setMessage("Employee added successfully!");
      window.alert("Employee added successfully");
      setErrors({});
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong";
    setMessage(errorMessage);

    
    window.alert(errorMessage);
    }
  };

  const handleReset = () => {
    setFormData({
      Name: "",
      Email: "",
      Phone_NO: "",
      Joining_Date: "",
      Role: "",
      Department: "",
    });
    setErrors({});
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Employee</h2>
        {/* {message && <p className={`mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
            {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Email ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Phone_NO ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Phone_NO}
              onChange={(e) => setFormData({ ...formData, Phone_NO: e.target.value })}
            />
            {errors.Phone_NO && (
              <p className="text-red-500 text-sm mt-1">{errors.Phone_NO}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Department</label>
            <select
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Department ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Department}
              onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.Department && (
              <p className="text-red-500 text-sm mt-1">{errors.Department}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Joining Date</label>
            <input
              type="date"
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Joining_Date ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Joining_Date}
              onChange={(e) => setFormData({ ...formData, Joining_Date: e.target.value })}
            />
            {errors.Joining_Date && (
              <p className="text-red-500 text-sm mt-1">{errors.Joining_Date}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Role</label>
            <input
              type="text"
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.Role ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.Role}
              onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
            />
            {errors.Role && <p className="text-red-500 text-sm mt-1">{errors.Role}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
