import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

const WarningDialog = ({
    title,
    children,
    cancelDialog,
    confirmDialog,
    id,
    state,
}) => {
    return (
        <Dialog
            open={state}
            onClose={cancelDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => confirmDialog(id)}>Yes</Button>
                <Button onClick={cancelDialog} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default WarningDialog
