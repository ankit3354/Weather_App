import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URI } from "../../api";
import "./search.css";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
  const [toggle, setToggle] = useState(true);

  const loadOptions = async (inputValue) => {
    return await fetch(
      `${GEO_API_URI}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.error(error));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  useEffect(() => {
    if (toggle) {
      document.body.classList.remove("toogleDark");
      document.body.classList.add("togglelight");
    } else {
      document.body.classList.remove("togglelight");
      document.body.classList.add("toogleDark");
    }
  }, [toggle]);

  return (
    <>
      <div className="toggle-wrapper">
        <label htmlFor="theme" className="theme">
          <span className="theme__toggle-wrap">
            <input
              id="theme"
              className={"theme__toggle"}
              type="checkbox"
              role="switch"
              name="theme"
              value="Dark"
              onChange={() => setToggle((prev) => !prev)}
            />
            <span className="theme__fill"></span>
            <span className="theme__icon">
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
            </span>
          </span>
        </label>
      </div>
      <AsyncPaginate
        placeholder="Search a city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </>
  );
}

export default Search;
