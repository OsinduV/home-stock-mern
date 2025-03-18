import express from 'express'
import PDFDocument from 'pdfkit';
import fs from "fs";

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
  
export default reportRouter;