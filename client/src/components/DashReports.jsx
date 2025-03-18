import React from 'react'
import axios from "axios";

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
      <div>
        <h2>Download Inventory Reports</h2>
        <button onClick={downloadPDF}>Download PDF Report</button>
        <button onClick={downloadExcel}>Download Excel Report</button>
      </div>
    );
  };
  
  export default DashReports;
