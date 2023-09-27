import "./main_page.css";

import Header from "./header";
import { useEffect, useMemo, useState } from "react";
import {
  Switch,
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom";
import FeaturedHouse from "./featured-house";
import SearchResults from "../search-results";
import HouseFilter from "./house-filter";
import HouseFromQuery from "../house/HouseFromQuery";

function App() {
  const [allHouses, setAllHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);
  return (
    <BrowserRouter>
      <div className="container">
        <Header subtitle="Providing houses all over the world props"></Header>
        <HouseFilter allHouses={allHouses}></HouseFilter>
        <Switch>
          <Route path="/searchresults/:country">
            <SearchResults allHouses={allHouses}></SearchResults>
          </Route>
          <Route path="/house/:id">
            <HouseFromQuery allHouses={allHouses}> </HouseFromQuery>
          </Route>
          <Route exact path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
