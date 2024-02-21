import React from "react";
import { message } from "antd";
import FormContainer from "./FormContainer";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const InputContainer = ({ setGoingStorage }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // Function to add new Data to LocalStorage
  function addToLocalStorage(newObj) {
    let temp = [];

    if (localStorage.length !== 0) {
      temp = JSON.parse(localStorage.getItem("ongoing"));
    }

    temp.push(newObj);
    localStorage.setItem("ongoing", JSON.stringify(temp));
    setGoingStorage(temp);
  }

  // This function will be called as soon as user clicks on 'Add Task' button
  const onFinish = (e) => {
    // Created new object to add new task in localstorage
    let newObj = {};
    newObj["id"] = Date.now();
    newObj["title"] = e.user.title;
    newObj["desc"] = e.user.description;
    addToLocalStorage(newObj);

    // Toast Message dsplay
    messageApi.open({
      type: "success",
      content: "Task added successfully!",
    });
  };

  return (
    <>
      {contextHolder}

      <div className="border-2  w-fit px-10 py-5 my-5 h-fit border-black">
        <FormContainer
          layout={layout}
          success={onFinish}
          btnText={"Add Task"}
          styling={"flex"}
        />
      </div>
    </>
  );
};

export default InputContainer;
