import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import './App.css';

function App() {

  const [value, setValue] = useState({
    courses: [],
  });

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/cari-kursus/query";

    const headers = {
      'Accept': 'application/sparql-results+json,*/*;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    const queryData = {
      query:
        `PREFIX cl: <http://carikursus.com/ns/courselist#>
  
        SELECT ?name ?category ?platform ?link ?desc ?feature
        WHERE
        {
          ?c     cl:name    ?name ;
                cl:category    ?category ;
                cl:platform    ?platform ;
                cl:link    ?link ;
                cl:desc    ?desc ;
          OPTIONAL {?c     cl:feature  ?feature . }
        }`
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: 'POST',
        headers,
        data: qs.stringify(queryData)
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((courses, index) => formatter(courses, index));
      console.log(formatted_data)

      setValue({
        ...value,
        courses: formatted_data
      });
    } catch (err) {
      console.error(err);
    }
  }

  const formatter = (course, index) => {
    return {
      "id": index,
      "name": course.name.value,
      "category": course.category.value,
      "platform": course.platform.value,
      "link": course.link.value,
      "desc": course.desc.value,
      "feature": course.feature ? course.feature.value.split(", ") : ''
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getData}>Get List</button>
        <ol>
          {value.courses.map((item, i) => <li key={i}>{item.name}</li>)}
        </ol>
        <div>
        </div>
      </header>
    </div>
  );
}

export default App;
