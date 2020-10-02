import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const SimpleDialog = ({ dialog, setDialog }) => (
  <Dialog onClose={() => setDialog(false)} open={dialog}>
    <DialogTitle id="simple-dialog-title">Buy Book</DialogTitle>
    <List>
      <a href={dialog.saleInfo.buyLink}>
        <ListItem button={true}>
          <ListItemText primary={"Click here"} />
        </ListItem>
      </a>
    </List>
  </Dialog>
);

export default SimpleDialog;
