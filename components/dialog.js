import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

export default function WarningDialog({
    title,
    children,
    handleClickCancel,
    handleClickOke,
    itemToDeleteKey,
    state,
}) {
    return (
        <Dialog
            open={state}
            onClose={handleClickCancel}
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
                <Button onClick={() => handleClickOke(itemToDeleteKey)}>
                    Oke
                </Button>
                <Button onClick={handleClickCancel} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
