import { ChangeEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HubsDataService from "../services/hub.service";
import IHubData from "../types/hubs.type";

const Hub = () => {
  const [currentHub, setCurrentHub] = useState<IHubData | null>(null);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  // get a hub by its id
  useEffect(() => {
    HubsDataService.get(id as string)
      .then((response) => {
        setCurrentHub(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [id]);

  //   change title
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (currentHub) {
      setCurrentHub({
        ...currentHub,
        title: title,
      });
    }
  };
  //   change description
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    if (currentHub) {
      setCurrentHub({
        ...currentHub,
        description: description,
      });
    }
  };

  //  update completed status
  const updateCompleted = (status: boolean) => {
    if (currentHub) {
      const data: IHubData = {
        _id: currentHub._id,
        title: currentHub.title,
        description: currentHub.description,
        completed: status,
      };
      HubsDataService.update(data, currentHub._id)
        .then((response: any) => {
          setCurrentHub((prevHub) => ({
            ...prevHub!,
            completed: status,
          }));
          setMessage("The status was updated succesfully");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  //   update Hub
  const updateHub = () => {
    if (currentHub) {
      HubsDataService.update(currentHub, currentHub._id)
        .then((response: any) => {
          setMessage("The Hub was updated succesfully");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };
  //   delete Hub
  const deleteHub = () => {
    if (currentHub) {
      HubsDataService.delete(currentHub._id)
        .then((response: any) => {
          navigate("/");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      {currentHub ? (
        <div>
          <h4 className="m-2">Hub</h4>
          <form className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="text-blackblock appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                id="title"
                value={currentHub.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="text-blackblock appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                id="description"
                value={currentHub.description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="mb-4">
              <label>
                <strong>Status: </strong>
              </label>
              {currentHub.completed ? "Completed" : "Incomplete"}
            </div>
          </form>
          {currentHub.completed ? (
            <button
              onClick={() => updateCompleted(false)}
              className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue-500 text-white hover:bg-blue-600 mr-2"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={() => updateCompleted(true)}
              className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-blue-500 text-white hover:bg-blue-600 mr-2"
            >
              Publish
            </button>
          )}
          <button
            onClick={deleteHub}
            className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2"
          >
            Delete
          </button>
          <button
            onClick={updateHub}
            className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600"
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a tutorial...</p>
        </div>
      )}
    </>
  );
};

export default Hub;
