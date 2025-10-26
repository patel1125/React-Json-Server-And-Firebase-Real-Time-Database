// App.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Firebase imports
import {
  initializeApp
} from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWiDRZJvq14iAMpFe-g-sAtJUNIVuzLH4",
  authDomain: "vite-react-firebase-5a39f.firebaseapp.com",
  projectId: "vite-react-firebase-5a39f",
  storageBucket: "vite-react-firebase-5a39f.firebasestorage.app",
  messagingSenderId: "480878750871",
  appId: "1:480878750871:web:26fc8c5f0a73337da24dd2",
  measurementId: "G-968QR97F7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ---------- Modal ----------
const CustomModal = ({ isOpen, type, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  const isConfirm = type === "confirm";
  const headerClass = isConfirm ? "text-red-600" : "text-blue-600";
  const buttonClass = isConfirm
    ? "bg-red-500 hover:bg-red-600"
    : "bg-blue-500 hover:bg-blue-600";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
        <h3 className={`text-xl font-bold mb-3 ${headerClass}`}>{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {isConfirm && (
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={isConfirm ? onConfirm : onClose}
            className={`${buttonClass} text-white font-semibold py-2 px-4 rounded-lg transition shadow-md`}
          >
            {isConfirm ? "Confirm Delete" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Task 1: JSON-Server CRUD ----------
const JsonCrud = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const API_URL = "http://localhost:3000/users";

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        JSON-Server CRUD
      </h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ---------- Task 2: Firebase CRUD + Auth ----------
const FirebaseCrud = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert(`Sign-in failed: ${e.message}`);
    }
  };

  const handleSignOut = () => signOut(auth);

  const fetchTodos = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "todos"));
    setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    const ref = doc(db, "todos", todo.id);
    await updateDoc(ref, { completed: !todo.completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-green-600">
        Firebase CRUD + Google Auth
      </h2>

      {!user ? (
        <button
          onClick={signInWithGoogle}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p>Welcome, {user.displayName}</p>
            <button
              onClick={handleSignOut}
              className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
            >
              Sign Out
            </button>
          </div>

          <form onSubmit={addTodo} className="mb-4 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter todo"
              className="border p-2 flex-1 rounded"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
            >
              Add
            </button>
          </form>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-2 rounded border ${
                  todo.completed ? "bg-gray-100 line-through" : "bg-white"
                }`}
              >
                <span
                  className="cursor-pointer"
                  onClick={() => toggleTodo(todo)}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

