import React, { ChangeEvent, useState } from "react";
import IHubData from "../types/hubs.type";
import HubsDataService from "../services/hub.service";

const AddHub = () => {
  const [hub, setHub] = useState<IHubData>({
    title: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { title, description } = hub;

  // Add title
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setHub({
      ...hub,
      title: e.target.value,
    });
  };

  // Add description
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setHub({
      ...hub,
      description: e.target.value,
    });
  };

  // save a hub
  const saveHub = () => {
    const data: IHubData = {
      title: hub.title,
      description: hub.description,
    };
    HubsDataService.create(data)
      .then((response: any) => {
        setHub({
          title: response.data.title,
          description: response.data.description,
        });
        setSubmitted(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // add another hub
  const newHub = () => {
    setHub({
      title: "",
      description: "",
    });
    setSubmitted(false);
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button
            onClick={newHub}
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:green-600"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="mb-2">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              required
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          <button
            onClick={saveHub}
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:green-600"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default AddHub;
