import { useState } from "react";
import "./App.css";
import Completed from "./components/Completed";
import InputContainer from "./components/InputContainer";
import Ongoing from "./components/Ongoing";
import { Button } from "antd";
// import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  // To display ongoing tasks
  const [goingStorage, setGoingStorage] = useState([]);

  // To display completed tasks
  const [doneStorage, setDoneStorage] = useState([]);

  return (
    <div className="App flex flex-col p-5 items-center">
      <h1 className="text-4xl text-center">Draggable Todo App</h1>

      {/* Main container to add new task  */}
      <InputContainer setGoingStorage={setGoingStorage} />

      {/* Clear localStorage and delete all tasks  */}
      <Button
        className="bg-red-500"
        onClick={() => {
          localStorage.clear();
          setGoingStorage([]);
          setDoneStorage([]);
        }}
      >
        Clear Storage
      </Button>

      <div className="flex main-container w-full mt-5">
        {/* Ongoing Task Container  */}
        <Ongoing
          setGoingStorage={setGoingStorage}
          setDoneStorage={setDoneStorage}
        />

        {/* Completed Task container  */}
        <Completed
          setGoingStorage={setGoingStorage}
          setDoneStorage={setDoneStorage}
        />
      </div>
    </div>
  );
}

export default App;
