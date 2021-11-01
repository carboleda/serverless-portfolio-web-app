import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export declare interface EditableNameProps {
  text: string,
  isEditing: boolean,
  onChange: (text: string) => void,
}

const EditableName = ({ text, isEditing, onChange }: EditableNameProps): JSX.Element => {
  const [newText, setNewText] = useState(text);
  useEffect(() => {
    if (!isEditing) {
      onChange(newText);
    }
  }, [newText, isEditing, onChange]);

  if (isEditing) {
    return (
      <TextField
        variant="standard"
        margin="normal"
        placeholder="Name"
        value={newText}
        onChange={(event) => { setNewText(event.target.value); }} />
    );
  }

  return (
    <Typography
      sx={{ display: 'inline' }}
      component="div"
      variant="h5"
      color="text.primary">
      {text}
    </Typography>
  );
}

export default EditableName;