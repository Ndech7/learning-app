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
        console.log(response.data);
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
          console.log(response.data);
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
          console.log(response.data);
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
          console.log(response.data);
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
          <h4>Hub</h4>
          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="text-black"
                id="title"
                value={currentHub.title}
                onChange={onChangeTitle}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="text-black"
                id="description"
                value={currentHub.description}
                onChange={onChangeDescription}
              />
            </div>
            <div>
              <label>
                <strong>Status: </strong>
              </label>
              {currentHub.completed ? "Completed" : "Incomplete"}
            </div>
          </form>
          {currentHub.completed ? (
            <button onClick={() => updateCompleted(false)}>Unpublish</button>
          ) : (
            <button onClick={() => updateCompleted(true)}>Publish</button>
          )}
          <button onClick={deleteHub}>Delete</button>
          <button onClick={updateHub}>Update</button>
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
