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
        console.log(response);
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
          <button onClick={newHub}>Add</button>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="text-black"
              required
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="text-black"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          <button onClick={saveHub}>Submit</button>
        </div>
      )}
    </>
  );
};

export default AddHub;
