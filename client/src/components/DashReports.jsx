import React from 'react'
import axios from "axios";
import HoverEffectButton from './HoverEffectButton';
//import ParticlesBackground from './ParticlesBackground';

const DashReports = () => {
    const downloadPDF = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/generate-pdf", {
          responseType: "blob", // Handle binary files
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Inventory_Report.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };
  
    const downloadExcel = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/generate-excel", {
          responseType: "blob",
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Inventory_Report.xlsx");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error downloading Excel:", error);
      }
    };
  
    return (
      <div className="min-h-screen flex bg-gray-100">
        
    {/* Sidebar (Assuming you have one) */}
     <aside className="w-64 bg-gray-900 text-white p-4">
        {/* Sidebar content here */}
    </aside> 

    {/* Main Content */}
    <div className="flex-grow bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inventory Report</h2>

        {/* Report Content */}
        <div className="border rounded-lg p-4 bg-gray-50 text-gray-700">
            <p className="mb-2"><strong>Total Items:</strong> 1</p>
            <p className="mb-2"><strong>Out of Stock:</strong> 5</p>
            <p className="mb-2"><strong>Last Updated:</strong> March 20, 2025</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
        <HoverEffectButton onClick={downloadPDF}>
            Download PDF Report
           </HoverEffectButton>
           <HoverEffectButton onClick={downloadExcel}>
            Download PDF Report
           </HoverEffectButton>
        </div>
    </div>
</div>

);
  };
  
  export default DashReports;
