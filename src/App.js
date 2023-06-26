import Map from "./components/Map";
import { useState, useEffect } from "react";
import nasaApiData from "./nasaApi.json";
import Header from "./components/Header";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setEventData(nasaApiData.events);
      setLoading(false);
    };

    fetchEvents();
  }, []);


  return (
    <div className="App">
      <Header/>
       {!loading ? <Map eventData={eventData} /> : <h1>Loading</h1>}
    </div>
  );
}

export default App;
