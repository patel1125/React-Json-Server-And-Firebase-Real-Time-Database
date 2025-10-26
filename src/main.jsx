const App = () => {
  const [activeTab, setActiveTab] = useState("api");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-blue-700 py-6">
        React CRUD Practice
      </h1>

      <div className="flex justify-center space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("api")}
          className={`px-4 py-2 rounded ${
            activeTab === "api"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          JSON-Server CRUD
        </button>
        <button
          onClick={() => setActiveTab("firebase")}
          className={`px-4 py-2 rounded ${
            activeTab === "firebase"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Firebase CRUD
        </button>
      </div>

      {activeTab === "api" ? <JsonCrud /> : <FirebaseCrud />}
    </div>
  );
};

export default App;