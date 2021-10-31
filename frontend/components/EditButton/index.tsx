import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export declare interface EditButtonProps {
  isEditing: boolean,
  onClick: (edit: boolean) => void
}

const EditButton = ({ isEditing, onClick }: EditButtonProps): JSX.Element => {
  return (
    <Button onClick={() => onClick(!isEditing)}>
      {isEditing && <>Save <SaveIcon /></>}
      {!isEditing && <>Edit <EditIcon /></>}
    </Button>
  );
}

export default EditButton;