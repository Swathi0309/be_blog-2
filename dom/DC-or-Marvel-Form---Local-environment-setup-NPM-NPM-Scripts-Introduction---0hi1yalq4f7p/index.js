import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const App = () => {
  const [age, setAge] = useState("");
  const [formType, setFormType] = useState("");
  const [show, setShow] = useState("");
  const [page, setPage] = useState("start-page");

  const handleNext = () => {
    if (age && formType) {
      setPage(formType === "Form A" ? "form-a" : "form-b");
    }
  };

  const handleSubmit = () => {
    if (show) {
      setPage("summary");
    }
  };

  const handleStartOver = () => {
    setAge("");
    setFormType("");
    setShow("");
    setPage("start-page");
  };

  const shows = {
    "Form A": ["Marvel Show 1", "Marvel Show 2", "Marvel Show 3"],
    "Form B": ["DC Show 1", "DC Show 2", "DC Show 3"],
  };

  if (page === "start-page") {
    return (
      <div id="start-page">
        <h1>Start Page</h1>
        <label>
          Select Form:
          <select value={formType} onChange={(e) => setFormType(e.target.value)}>
            <option value="">Select</option>
            <option value="Form A">Form A</option>
            <option value="Form B">Form B</option>
          </select>
        </label>
        <br />
        <label>
          Enter Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleNext} disabled={!age || !formType}>
          Next
        </button>
      </div>
    );
  } else if (page === "form-a") {
    return (
      <div id="form-a">
        <h1>Form A</h1>
        <label>
          Select Show:
          <select value={show} onChange={(e) => setShow(e.target.value)}>
            <option value="">Select</option>
            {shows["Form A"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          id="submit-marvel"
          onClick={handleSubmit}
          disabled={!show}
        >
          Submit
        </button>
      </div>
    );
  } else if (page === "form-b") {
    return (
      <div id="form-b">
        <h1>Form B</h1>
        <label>
          Select Show:
          <select value={show} onChange={(e) => setShow(e.target.value)}>
            <option value="">Select</option>
            {shows["Form B"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button
          id="submit-dc"
          onClick={handleSubmit}
          disabled={!show}
        >
          Submit
        </button>
      </div>
    );
  } else if (page === "summary") {
    return (
      <div id="summary">
        <h1>Summary</h1>
        <p>Age: {age}</p>
        <p>Form Type: {formType}</p>
        <p>Show: {show}</p>
        <button id="go-back" onClick={() => setPage(formType === "Form A" ? "form-a" : "form-b")}>
          Go Back
        </button>
        <button id="start-over" onClick={handleStartOver}>
          Start Over
        </button>
      </div>
    );
  }

  return null;
};

ReactDOM.render(<App />, document.getElementById("root"));
