import { Collapse, Divider } from "antd";
import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import UpdateModal from "./UpdateModal";
// import { DragDropContext } from 'react-beautiful-dnd';

const Ongoing = ({ setGoingStorage, setDoneStorage }) => {
  // Usestate to display/hide Update Modal
  const [isUpdate, setIsUpdate] = useState(false);

  // useState to store current task which is to be updated
  const [currTask, setCurrTask] = useState("");

  // Function to delete particular task
  function deleteTask(task) {
    let items = JSON.parse(localStorage.getItem("ongoing"));

    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      if (object.title === task) {
        items.splice(i, 1);
      }
    }

    localStorage.setItem("ongoing", JSON.stringify(items));
    setGoingStorage(items);
  }

  // Function to transfer task from ongoing container to completed container
  function taskDone(task) {
    // console.log(JSON.parse(localStorage.getItem("completed")));

    let temp = JSON.parse(localStorage.getItem("completed")) || [];

    let items = JSON.parse(localStorage.getItem("ongoing")) || [];

    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      if (object.title === task) {
        temp.push(object);
        items.splice(i, 1);
      }
    }

    localStorage.setItem("completed", JSON.stringify(temp));
    localStorage.setItem("ongoing", JSON.stringify(items));
    setGoingStorage(items);
    setDoneStorage(temp);
  }

  // Function to display check update and delete button features
  function features() {
    return (
      <>
        {/* Task Complete button  */}
        <MinusCircleOutlined
          className="features"
          onClick={(e) => {
            var el =
              e.target.parentElement.parentElement.parentElement.childNodes[1]
                .innerText;

            taskDone(el);
          }}
        />

        {/* Task Update Button  */}
        <EditOutlined
          className="mx-4 features"
          onClick={(e) => {
            var el =
              e.target.parentElement.parentElement.parentElement.childNodes[1]
                .innerText;
            setIsUpdate(true);
            setCurrTask(el);
          }}
        />

        {/* Task Delete Button  */}
        <DeleteOutlined
          className="features"
          onClick={(e) => {
            var el =
              e.target.parentElement.parentElement.parentElement.childNodes[1]
                .innerText;
            if (
              window.confirm(`Are you sure you want to delete ` + el + " ?") ===
              true
            ) {
              deleteTask(el);
            }
          }}
        />
      </>
    );
  }

  // Fetching tasks from localStorage['ongoing']
  let temp = JSON.parse(localStorage.getItem("ongoing"));
  const items = temp?.map((i) => {
    return {
      label: Object.values(i).at(1),
      children: <pre>{Object.values(i).at(2)}</pre>,
      extra: features(),
    };
  });

  return (
    <>
      {isUpdate ? (
        <UpdateModal
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          data={currTask}
          setGoingStorage={setGoingStorage}
        />
      ) : null}

      {/* Display Ongoing Tasks  */}
      <div className=" flex flex-col disp-container bg-red-300 items-center rounded-2xl  shadow-[8px_8px_5px_#000] w-1/2 p-2">
        <h2 className="text-3xl">Ongoing Tasks</h2>
        <Divider />
        <div className="taskList w-full p-4">
          <Collapse
            defaultActiveKey={0}
            collapsible="icon"
            size="large"
            accordion
            showArrow={false}
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Ongoing;
