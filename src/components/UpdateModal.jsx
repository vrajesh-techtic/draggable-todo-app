import { Modal, message } from "antd";
import React, { useState } from "react";
import FormContainer from "./FormContainer";

const UpdateModal = ({ setIsUpdate, isUpdate, data, setGoingStorage }) => {
  const [modal2Open, setModal2Open] = useState(isUpdate);
  const [messageApi, contextHolder] = message.useMessage();

  // delete task from 'goingStorage' and 'localStorage['ongoing']
  function deleteTask(task) {
    let items = JSON.parse(localStorage.getItem("ongoing")) || [];

    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      if (object.title === task) {
        items.splice(i, 1);
      }
    }

    localStorage.setItem("ongoing", JSON.stringify(items));
  }

  // Add updated task to 'goingStorage' and 'localStorage['ongoing']
  function addToLocalStorage(newObj) {
    let temp = JSON.parse(localStorage.getItem("ongoing")) || [];

    temp.push(newObj);
    localStorage.setItem("ongoing", JSON.stringify(temp));
    setGoingStorage(temp);
  }

  const success = (e) => {
    let newTitle = e.user.title;
    let newDesc = e.user.description;

    // update task object
    let updatedObj = {};
    updatedObj["id"] = Date.now();
    updatedObj["title"] = newTitle;
    updatedObj["desc"] = newDesc;

    // delete old task
    deleteTask(data);

    // Add updated task
    addToLocalStorage(updatedObj);

    setModal2Open(false);
    setIsUpdate(false);

    messageApi.open({
      type: "success",
      content: "Task Updated successfully!",
    });
  };

  return (
    <>
      {contextHolder}

      <Modal
        className="flex max-[425px]:scale-[0.8] max-[425px]:place-self-center"
        title={<h3 className="text-center mb-4">Update Task</h3>}
        centered
        open={modal2Open}
        footer={null}
        onOk={null}
        onCancel={() => {
          setModal2Open(false);
          setIsUpdate(false);
        }}
      >
        <FormContainer
          styling={"flex flex-col my-4 space-y-5 "}
          success={success}
          btnText={"Update"}
        />
      </Modal>
    </>
  );
};

export default UpdateModal;
