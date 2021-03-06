import { useState, useEffect, SetStateAction } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
function Firetest() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState<Number>(0);
  const [users, setUsers] = useState([]);
  //pulls all information from collection
  const usersCollectionRef = collection(db, "test");
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "test", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async id => {
    const userDoc = doc(db, "test", id);
    await deleteDoc(userDoc);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div>
      <input
        placeholder="Name..."
        onChange={event => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={event => {
          setNewAge((Number(event.target.value)));
        }}
      />

      <button onClick={createUser}> Create User</button>

      {users.map(user => {
        return (
          <div key="">
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default Firetest;
