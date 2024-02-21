import { Collapse } from "antd";
import React from "react";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import { DragDropContext } from 'react-beautiful-dnd';

const Completed = ({ setGoingStorage, setDoneStorage }) => {
  // Function to delete particular task
  function deleteTask(task) {
    let items = JSON.parse(localStorage.getItem("completed"));

    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      if (object.title === task) {
        items.splice(i, 1);
      }
    }

    localStorage.setItem("completed", JSON.stringify(items));
    setDoneStorage(items);
  }

  // Function to transfer task from completed container to ongoing container
  function taskNotDone(task) {
    let temp = JSON.parse(localStorage.getItem("ongoing")) || [];

    let items = JSON.parse(localStorage.getItem("completed")) || [];

    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      if (object.title === task) {
        temp.push(object);
        items.splice(i, 1);
      }
    }

    localStorage.setItem("ongoing", JSON.stringify(temp));
    localStorage.setItem("completed", JSON.stringify(items));
    setGoingStorage(items);
    setDoneStorage(temp);
  }

  // Function to display check update and delete button features
  function features() {
    return (
      <>
        {/* Task Complete button  */}
        <PlusCircleOutlined
          className="mx-4 features"
          onClick={(e) => {
            var el =
              e.target.parentElement.parentElement.parentElement.childNodes[1]
                .innerText;

            taskNotDone(el);
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

  // Fetching tasks from localStorage['completed']
  let temp = JSON.parse(localStorage.getItem("completed"));
  const items = temp?.map((i) => {
    return {
      label: Object.values(i).at(1),
      children: <pre>{Object.values(i).at(2)}</pre>,
      extra: features(),
    };
  });

  return (
    //Display Completed Tasks
    <div className="flex flex-col disp-container items-center bg-blue-200 rounded-2xl shadow-[8px_8px_5px_#000] w-1/2 p-2">
      <h2 className="text-3xl">Completed Tasks</h2>
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
  );
};

export default Completed;
