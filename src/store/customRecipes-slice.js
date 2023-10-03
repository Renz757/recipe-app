import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage"
import { imageDB } from "../firebase_setup/firebase";
import { db } from "../firebase_setup/firebase";

const initialState = {
    customRecipeList: [],
    customRecipe: {},
    showModal: false
}

// export const deleteCustomRecipe = createAsyncThunk('deleteCustomRecipe', async (imageName, customRecipeId, userUid) => {
//     const imageRef = ref(imageDB, `images/${imageName}`);
//     console.log(imageName)
//     deleteObject(imageRef)
//         .then(() => {
//             console.log("file was deleted");
//         })
//         .catch((error) => {
//             console.log(error);
//         });



// })

export const customRecipeSlice = createSlice({
    name: 'customRecipe',
    initialState,
    reducers: {
        //gets state from db once app loads
        initialize(state, action) { state.customRecipeList = action.payload },
        submitForm(state, action) {
            const colRef = collection(db, "users", `${action.payload.uid}`, 'customRecipes')
            addDoc(colRef, { ...action.payload.recipeData })
            console.log(action.payload.recipeData)
        },
        deleteCustomRecipe(state, action) {

            //todo: delete image from fire store
            const docRef = doc(db, "users", `${action.payload.uid}`, "customRecipes", action.payload.id)
            deleteDoc(docRef)
            state.showModal = false
        },
        modalhandler(state) {
            state.showModal = !state.showModal
        }

    }
});

export const deleteCustomRecipe = (imageName, recipeId, uid) => {
    return async (dispatch) => {
        console.log(imageName, uid, recipeId)
        const imageRef = ref(imageDB, `images/${imageName}`)


        const deleteRecipe = async () => {

            await deleteObject(imageRef)
            console.log('image was deleted')

        }

        try {
            await deleteRecipe()

            dispatch(customRecipeSlice.actions.deleteCustomRecipe({
                id: recipeId,
                uid: uid,
            }))
        } catch (error) {
            console.error("an error occured")
        }

    }
}

export const customRecipeActions = customRecipeSlice.actions

