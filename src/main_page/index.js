import "./main_page.css";

import Header from "./header";
import {
  Switch,
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom";
import FeaturedHouse from "./featured-house";
import SearchResults from "../search-results";
import HouseFilter from "./house-filter";
import HouseFromQuery from "../house/HouseFromQuery";
import useHouses from "../hooks/useHouses";
import useFeaturedHouse from "../hooks/usefeaturedHouse";
import HousesContext from "../context/housesContext";

function App() {
  const allHouses = useHouses();
  const featuredHouse = useFeaturedHouse(allHouses);
  return (
    <BrowserRouter>
      <HousesContext.Provider value={allHouses}>
        <div className="container">
          <Header subtitle="Providing houses all over the world props"></Header>
          <HouseFilter></HouseFilter>
          <Switch>
            <Route path="/searchresults/:country">
              <SearchResults></SearchResults>
            </Route>
            <Route path="/house/:id">
              <HouseFromQuery> </HouseFromQuery>
            </Route>
            <Route exact path="/">
              <FeaturedHouse house={featuredHouse}></FeaturedHouse>
            </Route>
          </Switch>
        </div>
      </HousesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
