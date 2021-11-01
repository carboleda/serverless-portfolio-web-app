import { TextareaAutosize } from "@mui/core";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export declare interface EditableBioProps {
  text: string,
  isEditing: boolean,
  onChange: (text: string) => void,
}

const EditableBio = ({ text, isEditing, onChange }: EditableBioProps): JSX.Element => {
  const style = { p: 2, border: '1px dashed grey', width: '100%' };
  const [newText, setNewText] = useState(text);
  useEffect(() => {
    if (!isEditing) {
      onChange(newText);
    }
  }, [newText, isEditing, onChange]);

  if (isEditing) {
    return (
      <TextareaAutosize
        aria-label="Bio"
        minRows={5}
        maxRows={10}
        placeholder="Bio"
        value={newText}
        onChange={(event) => { setNewText(event.target.value); }}
        style={{ ...style, padding: 15 }} />
    );
  }

  return (
    <Box component="span" sx={style}>
      {newText}
    </Box>
  );
}

export default EditableBio;