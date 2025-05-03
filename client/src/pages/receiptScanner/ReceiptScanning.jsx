// Receipt Scanning Page with Editable Fields for Each Extracted Item in Modal
import React, { useState } from "react";
import {
  Button,
  FileInput,
  Spinner,
  Modal,
  TextInput,
  Alert,
  Card,
  Select,
  Label
} from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ReceiptScannerNew() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [scannedItems, setScannedItems] = useState([
    { itemname: "Milk", quantity: 2, price: 3.49, category: "Dairy" },
    { itemname: "Bread", quantity: 1, price: 2.25, category: "Bakery" },
    { itemname: "Toilet Paper", quantity: 1, price: 5.0, category: "Household" },
    { itemname: "Chips", quantity: 3, price: 1.5, category: "Uncategorized" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [resultModalOpen, setResultModalOpen] = useState(true);

  const validCategories = ["Dairy", "Bakery", "Meat", "Fruits", "Vegetables", "Snacks", "Beverages", "Household", "Frozen", "Personal Care", "Uncategorized"];

  const handleScanReceipt = async () => {
    if (!file) return setUploadError("Please select a file first.");
    setUploadError(null);
    setError(null);
    setLoading(false);
    setUploadProgress(0);

    try {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        () => {
          setUploadError("Upload failed");
          setUploadProgress(null);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(url);
          setUploadProgress(null);
          setLoading(true);

          const res = await fetch("/api/ocr/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: url }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Scan failed");

          setScannedItems(data);
          setResultModalOpen(true);
        }
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...scannedItems];
    updatedItems[index][field] = value;
    setScannedItems(updatedItems);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Receipt Scanner</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-2">Select and Scan Receipt</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <FileInput accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <Button gradientDuoTone="purpleToPink" onClick={handleScanReceipt} disabled={loading || uploadProgress}>Scan Receipt</Button>
        </div>

        {file && (
          <img src={URL.createObjectURL(file)} alt="Preview" className="mt-4 max-h-72 rounded border" />
        )}

        {uploadProgress && (
          <div className="w-20 h-20 mt-4">
            <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />
          </div>
        )}

        {loading && (
          <div className="flex items-center mt-4">
            <Spinner size="md" className="mr-2" />
            <span className="text-sm">Scanning receipt using AI...</span>
          </div>
        )}

        {uploadError && <Alert color="failure" className="mt-2">{uploadError}</Alert>}
        {error && <Alert color="failure" className="mt-2">{error}</Alert>}
      </Card>

      <Modal show={resultModalOpen} onClose={() => setResultModalOpen(false)} size="7xl">
        <Modal.Header>Review Extracted Items</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {scannedItems.map((item, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow border dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`itemname-${index}`}>Item Name</Label>
                    <TextInput id={`itemname-${index}`} value={item.itemname} onChange={(e) => handleFieldChange(index, "itemname", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <TextInput type="number" id={`quantity-${index}`} value={item.quantity} onChange={(e) => handleFieldChange(index, "quantity", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <TextInput type="number" id={`price-${index}`} value={item.price} onChange={(e) => handleFieldChange(index, "price", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor={`category-${index}`}>Category</Label>
                    <Select id={`category-${index}`} value={item.category} onChange={(e) => handleFieldChange(index, "category", e.target.value)}>
                      {validCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setResultModalOpen(false)}>Save & Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
