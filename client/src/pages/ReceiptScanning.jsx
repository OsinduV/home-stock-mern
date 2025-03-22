import React, { useEffect } from "react";
import {
  Alert,
  Button,
  FileInput,
  Modal,
  Select,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function ReceiptScanning() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [receiptItems, setReceiptItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  console.log(formData);
  console.log(receiptItems);

  // useEffect(() => {
  //   setReceiptItems([
  //     { itemname: "BREAD", quantity: 1, price: 2.88 },
  //     { itemname: "GV PNT BUTTR", quantity: 1, price: 3.84 },
  //     { itemname: "MILK", quantity: 1, price: 4.50 },
  //   ]);
  // }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editData, setEditData] = useState({
    itemname: "",
    quantity: "",
    price: "",
  });

  // Open Modal and Set Selected Item
  const handleEditClick = (index) => {
    setScrollPosition(window.scrollY); // Save scroll position
    setSelectedIndex(index);
    setEditData({ ...receiptItems[index] });
    setIsModalOpen(true);
  };

  // Handle Input Changes
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save Updated Data
  const handleSaveChanges = () => {
    const updatedItems = [...receiptItems];
    updatedItems[selectedIndex] = editData; // Update item at selected index
    setReceiptItems(updatedItems);
    setIsModalOpen(false);
    setTimeout(() => {
      window.scrollTo(0, scrollPosition); // Restore scroll position
    }, 0);
  };

  // Delete Item
  const handleDelete = (index) => {
    const updatedItems = receiptItems.filter((_, i) => i !== index);
    setReceiptItems(updatedItems);
  };

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, imageUrl: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ocr/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setReceiptItems(data);

        console.log("success");
        setLoading(false);
      }
    } catch (error) {
      setPublishError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Scan a Receipt
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Publish"
          )}
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>

      {receiptItems.length > 0 ? (
        <>
          <h1 className="text-center text-xl mt-14 mb-5 font-semibold">
            Receipt Items
          </h1>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>index</Table.HeadCell>
                <Table.HeadCell>item name</Table.HeadCell>
                <Table.HeadCell>quantity</Table.HeadCell>
                <Table.HeadCell>price</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {receiptItems.map((item, index) => (
                <Table.Body className="divide-y">
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.itemname}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          handleEditClick(index);
                        }}
                        className="text-teal-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleDelete(index)}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>

            {/* Edit Modal */}
            <Modal show={isModalOpen} size="md" onClose={() =>{ setIsModalOpen(false);
              setTimeout(() => {
                window.scrollTo(0, scrollPosition); // Restore scroll position
              }, 0);
            }} popup>
              <Modal.Header>Edit Item</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-4">
                  <TextInput
                    label="Item Name"
                    name="itemname"
                    value={editData.itemname}
                    onChange={handleEditChange}
                  />
                  <TextInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={editData.quantity}
                    onChange={handleEditChange}
                  />
                  <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={handleEditChange}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleSaveChanges}>Save</Button>
                <Button color="gray" onClick={() => {setIsModalOpen(false)
                  setTimeout(() => {
                    window.scrollTo(0, scrollPosition); // Restore scroll position
                  }, 0);
                }}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>

            {/* <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeletePost}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
