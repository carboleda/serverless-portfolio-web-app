import { Button, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export declare interface EditButtonProps {
  isEditing: boolean,
  isLoading: boolean,
  onEditStarted: () => void
  onEditFinished: () => void
}

const EditButton = (props: EditButtonProps): JSX.Element => {
  const { isEditing, isLoading, onEditStarted, onEditFinished } = props;
  if (isLoading) {
    return (
      <CircularProgress size={30} />
    )
  }

  if (isEditing) {
    return (
      <Button onClick={() => onEditFinished()}>
        Save <SaveIcon />
      </Button>
    );
  }

  return (
    <Button onClick={() => onEditStarted()}>
      Edit <EditIcon />
    </Button>
  );
}

export default EditButton;