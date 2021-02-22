import React from "react";
import { useUserState } from "../utils/userContext";

import ItemList from "../components/itemlist.component";

const DashboardPanel = () => {
  const { documentState, dispatch } = useUserState();
  const {
    documents: { list },
  } = documentState;

  return (
    <>
      <button>Add</button>
      <ItemList items={list} />
    </>
  );
};

export default DashboardPanel;
