import Form from "./pages/Form";
import ShowData from "./pages/ShowData";
import Header from "./components/custom/Header";

import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
         <main>
           <Switch>
              <Route path='/formInput/:inputId' exact>
                <Form/>
              </Route>
              <Route path='/formInput' exact>
                <Form/>
              </Route>
              <Route path='/showData' exact>
                <ShowData/>
              </Route>
            </Switch>
          </main>
    </div>
  );
}

export default App;
