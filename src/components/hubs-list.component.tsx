import React, { useEffect, useState, ChangeEvent } from "react";
import HubsDataService from "../services/hub.service";
import { Link } from "react-router-dom";
import IHubData from "../types/hubs.type";

const HubsList = () => {
  const [hubs, setHubs] = useState<IHubData[] | null>(null);
  const [currentHub, setCurrentHub] = useState<IHubData | null>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  // load all hubs on initial load; empty dependency array
  useEffect(() => {
    HubsDataService.getAll()
      .then((response: any) => {
        console.log(response.data);
        setHubs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  //   search hub by title; with a state value in dependancy array
  useEffect(() => {
    HubsDataService.findByTitle(searchTitle)
      .then((response: any) => {
        console.log(response.data);
        setHubs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [searchTitle]);

  //   highlight a hub
  const setActiveHub = (hub: IHubData, index: number) => {
    setCurrentHub(hub);
    setCurrentIndex(index);
    console.log({ index: index, hub: hub });
  };

  //   remove all hubs
  const removeHubs = () => {
    HubsDataService.deleteAll()
      .then((response: any) => {
        setHubs(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <>
      <div>
        <div className="grid grid-rows-4">
          <div>
            <input
              type="text"
              className="text-black"
              placeholder="Search By Title"
              value={searchTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const searchTitle = e.target.value;
                console.log(searchTitle);
                setSearchTitle(searchTitle);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <h4>Hubs List</h4>
        <ul>
          {hubs
            ? hubs.map((hub: IHubData, index: number) => (
                <li
                  key={hub._id?.toString()}
                  onClick={() => setActiveHub(hub, index)}
                >
                  {hub.title}
                </li>
              ))
            : null}
        </ul>
        <button onClick={removeHubs}>Remove All</button>
      </div>
      <div>
        {currentHub ? (
          <div>
            <h4>Hub</h4>
            <div>
              <label>
                <strong>Title: </strong>
              </label>
              {currentHub.title}
            </div>
            <div>
              <label>
                <strong>Description: </strong>
              </label>
              {currentHub.description}
            </div>
            <div>
              <label>
                <strong>Status: </strong>
              </label>
              {currentHub.completed ? "Complete" : "Incomplete"}
            </div>
            <Link to={`/hubs/${currentHub._id}`}>Edit</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Hub...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HubsList;
