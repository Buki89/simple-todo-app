import { VFC, useCallback, useEffect, useState } from "react";
import { ItemList, NavBar } from "../../components";
import styled from "styled-components";
import { useHistory } from "react-router";
import { onValue, ref } from "firebase/database";
import { useTaskContext } from "../../../../context";
import { useAuthContext } from "../../../../context/auth-context";
import { auth, db } from "../../../../firebase";
import { ActionType } from "../../../../types";
import { Card } from "../../../core";
import { AddNewTaskForm } from "../../containers";
import CategorySwitch from "../../components/CategorySwitch";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dashboard: VFC = () => {
  const { dispatch, state } = useTaskContext();
  const [loading, setLoading] = useState(true);

  const uid = useAuthContext();

  const history = useHistory();

  const handleRemoveItem = useCallback(
    (id: string) => dispatch({ type: ActionType.removeTask, payload: id }),
    [dispatch]
  );

  const handleComplete = useCallback(
    (checked: boolean, id: string) => {
      dispatch({
        type: ActionType.editTask,
        payload: { completed: checked, id },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/");
      }
      console.log("Signed user with: ", user?.uid);
    });
  }, [history]);

  useEffect(() => {
    if (uid) {
      const tasksRef = ref(db, `users/${auth.currentUser?.uid}`);
      onValue(tasksRef, async (snapshot) => {
        try {
          const data = await snapshot.val();
          const tasks = Object.keys(data).map((task: string) => data[task]);
          dispatch({ type: ActionType.fetchTasks, payload: tasks });
          setLoading(false);
        } catch (error) {
          console.log("error", error);
          setLoading(false);
        }
      });
    }

    return () => setLoading(false);
  }, [dispatch, uid]);

  return (
    <Card>
      <Container>
        <NavBar />
        <CategorySwitch />
        <AddNewTaskForm />
        <ItemList
          loading={loading}
          tasks={state}
          handleComplete={handleComplete}
          handleRemoveItem={handleRemoveItem}
        />
      </Container>
    </Card>
  );
};

export default Dashboard;
