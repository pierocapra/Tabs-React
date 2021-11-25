import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let fetchedData = await response.json();
      setData(fetchedData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const companySelector = (index) => {
    setValue(index);
  };

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (error) {
    return <h1 className="error">ERROR!</h1>;
  }
  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {data.map((job, index) => {
            return (
              <button
                key={index}
                className={`job-btn ${index === value ? "active-btn" : ""}`}
                onClick={() => companySelector(index)}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{data[value].title}</h3>
          <h4>{data[value].company}</h4>
          <p className="job-date">{data[value].dates}</p>
          <div>
            {data[value].duties.map((duty) => {
              return (
                <div className="job-desc">
                  <FaAngleDoubleRight className="job-icon" />

                  <p>{duty}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
