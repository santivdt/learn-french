import { useRef, useState } from 'react'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase'
import Snackbar from '../components/Snackbar'

const Editdata = () => {
    const [newItem, setNewItem] = useState({
        english: '',
        french: '',
    })

    const snackbarRef = useRef(null)

    const addData = async () => {
        initFirebase()
        try {
            await firebase
                .firestore()
                .collection('words')
                .doc()
                .set({
                    english: newItem.english,
                    french: newItem.french,
                    time_stamp: firebase.firestore.Timestamp.now(),
                })
                .then(
                    snackbarRef.current.show(),
                    setNewItem({
                        english: '',
                        french: '',
                    })
                )
        } catch (error) {
            console.log(error)
        }
    }

    const handleData = (event) => {
        setNewItem((prevNewItem) => ({
            ...prevNewItem,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <div className="maincontent">
            <Snackbar
                type="success"
                message="Data succesfully added!"
                ref={snackbarRef}
            />
            <div className="form">
                <input
                    id="english"
                    name="english"
                    value={newItem.english}
                    onChange={handleData}
                    className="textfield-input"
                    placeholder="English.."
                />
                <input
                    id="french"
                    name="french"
                    value={newItem.french}
                    onChange={handleData}
                    className="textfield-input"
                    placeholder="French"
                />
                <button
                    disabled={
                        newItem.french.length < 1 && newItem.french.length < 1
                    }
                    className="contained"
                    onClick={() => {
                        addData()
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default Editdata
