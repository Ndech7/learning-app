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
      <div className="list flex flex-wrap ">
        <div className="md:w-1/2 px-4">
          <div className="relative flex items-stretch w-full mb-3">
            <input
              type="text"
              className="text-blackblock appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
              placeholder="Search By Title"
              value={searchTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const searchTitle = e.target.value;
                setSearchTitle(searchTitle);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="md:w-1/2 px-4">
          <h4 className="m-2">Hubs List</h4>
          <ul className="flex flex-col pl-0 mb-0 border rounded border-gray-300">
            {hubs
              ? hubs.map((hub: IHubData, index: number) => (
                  <li
                    key={hub._id?.toString()}
                    className={
                      "relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline" +
                      (index === currentIndex ? "active:focus:bg-cyan-600" : "")
                    }
                    onClick={() => setActiveHub(hub, index)}
                  >
                    {hub.title}
                  </li>
                ))
              : null}
          </ul>
          <button
            className="m-6 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded no-underline py-1 px-2 leading-tight text-xs  bg-red-600 text-white hover:bg-red-700"
            onClick={removeHubs}
          >
            Remove All
          </button>
        </div>
        <div className="md:w-1/2 px-4">
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
              <Link
                to={`/hubs/${currentHub._id}`}
                className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-orange-400 text-black hover:bg-orange-500"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please select a Hub...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HubsList;
