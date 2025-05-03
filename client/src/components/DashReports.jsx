import React from 'react';
import axios from "axios";
import HoverEffectButton from './HoverEffectButton';
//import ParticlesBackground from './ParticlesBackground';

const DashReports = () => {
  const downloadPDF = async () => {
  try {
    console.log("Starting PDF download...");
    
    const response = await axios.get("http://localhost:5000/api/reports/generate-pdf", {
      responseType: "blob",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/pdf'
      },
      params: {
        reportType: 'styled', // Tell backend to generate styled PDF
        title: 'Inventory Report',
        data: JSON.stringify({
          totalItems: 1,
          outOfStock: 5,
          lastUpdated: 'May 3, 2025'
          // Add any other data you want in the report
        })
      },
      timeout: 30000
    });

    if (!response.data) {
      throw new Error("No data received from server");
    }

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Inventory_Report_${new Date().toISOString().slice(0,10)}.pdf`);
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    console.log("PDF downloaded successfully");
  } catch (error) {
    console.error("Error downloading PDF:", error);
    alert(`Failed to download PDF: ${error.message}`);
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
      <div className="w-full max-w-screen-xl mx-auto p-6 min-h-screen bg-gray-300 bg-cover bg-center" 
    style={{ backgroundImage: "url('/images/i1_background.jpg')", backgroundOpacity: 0.5, transition:'0.5s'  }}>
      {/* <div className="min-h-screen flex bg-gray-100"> */}
        
    {/* Sidebar (Assuming you have one) */}
     {/* <aside className="w-64 bg-gray-900 text-white p-4"> */}
        {/* Sidebar content here */}
    {/* </aside>  */}

    {/* Main Content */}
    <div className="flex-grow bg-white p-3 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inventory Report</h2>

        {/* Report Content */}
        <div className="border rounded-lg p-4 bg-gray-50 text-gray-700">
            <p className="mb-2"><strong>Total Items:</strong> 1</p>
            <p className="mb-2"><strong>Out of Stock:</strong> 5</p>
            <p className="mb-2"><strong>Last Updated:</strong> May 3, 2025</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
        <HoverEffectButton onClick={downloadPDF}>
            Download PDF Report
           </HoverEffectButton>
           <HoverEffectButton onClick={downloadExcel}>
            Download Excel Report
           </HoverEffectButton>
        </div>
    </div>
</div>
// </div>

);
  };
  
  export default DashReports;