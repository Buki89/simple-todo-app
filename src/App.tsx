import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { VFC } from "react";
import { TaskProvider } from "./context";
import { db } from "./firebase";
import { CreateNewAccount, Dashboard, Login } from "./views";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";

const App: VFC = () => (
  <FirebaseDatabaseProvider firebase={db}>
    <AuthContextProvider>
      <TaskProvider>
        <Router>
          <Route path="/" component={Login} exact={true} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-new-account" component={CreateNewAccount} />
        </Router>
      </TaskProvider>
    </AuthContextProvider>
  </FirebaseDatabaseProvider>
);

export default App;
