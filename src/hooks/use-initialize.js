import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { onSnapshot } from "firebase/firestore";

const useInitialize = (colRef, action) => {
    const dispatch = useDispatch();
    useEffect(() => {
        let data = [];
        onSnapshot(colRef, (snapshot) => {
            //get data from passed in collection ref
            for (const doc of snapshot.docs) {
                //map through snapshot and add data to array
                //copy previous data and format data in object
                data = [...data, { ...doc.data(), dbID: doc.id }]
            }
            //dispatch data and initialize reducer state
            dispatch(action.initialize(data));
            //reset to empty array
            data = []
        });
    }, []);
}

export default useInitialize;