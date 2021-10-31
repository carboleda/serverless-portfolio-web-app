import { useState } from "react";
import { TextareaAutosize } from "@mui/core";
import { Box } from "@mui/system";

export declare interface TimelineProps {
  text: string,
  isEditing: boolean
}

const EditableBio = ({ text, isEditing }: TimelineProps): JSX.Element => {
  const [editedText, setEditedText] = useState(text);
  const style = { p: 2, border: '1px dashed grey', width: '100%' };

  if (isEditing) {
    return (
      <TextareaAutosize
        aria-label="minimum height"
        minRows={10}
        placeholder="Minimum 3 rows"
        defaultValue={text}
        value={editedText}
        style={{ ...style, padding: 15 }} />
    );
  }

  return (
    <Box component="span" sx={style}>
      {editedText}
    </Box>
  );
}

export default EditableBio;