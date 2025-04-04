import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/user/getusers`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        console.log("Fetched Users Data:", data);

        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
          setShowMore(data?.pagination?.hasMore ?? false);
        } else {
          console.error("Invalid API Response Structure:", data);
          throw new Error("Invalid data structure from API");
        }
      } catch (err) {
        console.error("Fetch Error:", err.message);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id, currentUser?.isAdmin]);

  // ✅ Fix: Function to handle "Show More"
  const handleShowMore = async () => {
    try {
      const res = await fetch(`/api/user/getusers?nextPage=true`);
      if (!res.ok) throw new Error("Failed to load more users");

      const data = await res.json();
      if (data && Array.isArray(data.users)) {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        setShowMore(data?.pagination?.hasMore ?? false);
      }
    } catch (err) {
      console.error("Show More Error:", err.message);
      setError(err.message);
    }
  };
console.log(currentUser.isAdmin);
  // ✅ Fix: Function to delete user
  const handleDeleteUser = async () => {
    try {
      console.log(userIdToDelete);
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");
      

    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userIdToDelete));
      setShowModal(false);
      
    } catch (err) {
      console.error("Delete Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="p-3 overflow-x-auto md:mx-auto" key={users.id}>
      
      {currentUser?.isAdmin ? (
        <>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length > 0 ? (
            <>
              <Table hoverable className="w-full shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {users.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          src={user.avatar || "/default-avatar.png"}
                          alt={user.username}
                          className="object-cover w-10 h-10 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {user.isAdmin ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user._id);
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              {/* ✅ Fix: Conditionally Render "Show More" Button */}
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="self-center w-full text-sm text-teal-500 py-7"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>No users found!</p>
          )}
        </>
      ) : (
        <p>You must be an admin to view this page</p>
      )}

      {/* ✅ Fix: Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
