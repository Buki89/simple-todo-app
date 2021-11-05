import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { VFC } from "react";
import { TaskProvider } from "./context";
import { db } from "./firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { Dashboard } from "./modules/tasks";
import { CreateNewAccount, Login, ResetPassword } from "./modules/login";

const App: VFC = () => (
  <FirebaseDatabaseProvider firebase={db}>
    <AuthContextProvider>
      <TaskProvider>
        <Router>
          <Route path="/" component={Login} exact={true} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-new-account" component={CreateNewAccount} />
          <Route path="/reset-password" component={ResetPassword} />
        </Router>
      </TaskProvider>
    </AuthContextProvider>
  </FirebaseDatabaseProvider>
);

export default App;
