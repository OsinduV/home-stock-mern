import express from 'express'
import PDFDocument from 'pdfkit';
import fs from "fs";
import ExcelJS from "exceljs";

const reportRouter = express.Router();

// Sample inventory data (Replace with database query)
const inventoryData = [
    { name: "biscuit", category: "sweet",quantity:"1", price:450, supplier:"thoge aachchi",description:"that is a gift biscuit packate in 400g",createdAt:"2025-12-22T18:30:00.000Z",updatedAt:"2025-12-22T18:30:00.000Z"},
    
  ];
  //Api route to generate pdf
  reportRouter.get("/generate-pdf",(req,res)=>{
    const doc = new PDFDocument();
    const filePath = "inventory_report.pdf";

    

  // Pipe the document to a writable stream
  doc.pipe(fs.createWriteStream(filePath));

  // Title
  doc.fontSize(20).text("Inventory Report", { align: "center" });
  doc.moveDown();

  // Table Header
  doc.fontSize(14).text("No | Item Name | category | quantity |  price | supplier|   description  | createdAt | updatedAt", { underline: true });
  doc.moveDown(0.5);

  // Table Data
  inventoryData.forEach((item, index) => {
    doc.fontSize(12).text(`${index + 1}  |  ${item.name}  |  ${item.category}  |  ${item.quantity}  |   ${item.price}  |  ${item.supplier}  |   ${item.description}  |  ${item.createdAt}  |  ${item.updatedAt}`);
  });

  // Finalize the document
  doc.end();

  // Wait for the PDF file to be saved
  setTimeout(() => {
    res.download(filePath, "Inventory_Report.pdf", (err) => {
      if (err) console.log("Error sending file:", err);
      fs.unlinkSync(filePath); // Delete after download
    });
  }, 1000);
});

// API Route to Generate Excel
reportRouter.get("/generate-excel", async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory Report");

// Define Columns
worksheet.columns = [
    { header: "No", key: "id", width: 10 },
    { header: "Item Name", key: "name", width: 20 },
    { header: "Category", key: "category", width: 15 },
    { header: "Quantity", key: "quantity", width: 15 },
    { header: "Price", key: "price", width: 15 },
    { header: "Supplier", key: "supplier", width: 15 },
    { header: "Description", key: "description", width: 30 },
    { header: "CreatedAt", key: "createdAt", width: 25 },
    { header: "UpdatedAt", key: "updatedAt", width: 25 },
  ];  

  // Add Data Rows
  inventoryData.forEach((item, index) => {
    worksheet.addRow({ id: index + 1, name: item.name, category: item.category, quantity:item.quantity, price:item.price, supplier:item.supplier, description:item.description, createdAt:item.createdAt, updatedAt:item.updatedAt});
  });
  
  // Save to file
  const filePath = "inventory_report.xlsx";
  await workbook.xlsx.writeFile(filePath);

// Send file to client
res.download(filePath, "Inventory_Report.xlsx", (err) => {
    if (err) console.log("Error sending file:", err);
    fs.unlinkSync(filePath); // Delete after download
  });
});

export default reportRouter;