import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { imageDB } from "../firebase_setup/firebase";
import { ref, deleteObject } from "firebase/storage";
import { db } from "../firebase_setup/firebase";

const colRef = collection(db, 'customRecipes')

//add initialize reducer to ste custom recpies to array 

const initialState = {
    customRecipeList: [],
    customRecipe: {},
    title: '',
    estimatedCookTime: '',
    servingSize: '',
    image: '',
    imageName: '',
    ingredients: JSON.parse(
        localStorage.getItem("ingredientArray") || "[]"
    ),
    item: '',
    instructions: JSON.parse(
        localStorage.getItem("instructionsArray") || "[]"
    ),
    step: '',
    showModal: false
}

export const customRecipeSlice = createSlice({
    name: 'customRecipe',
    initialState,
    reducers: {
        initialize(state, action) { state.customRecipeList = action.payload },
        submitForm(state) {
            state.customRecipe = {
                title: state.title,
                estimatedCookTime: state.estimatedCookTime,
                servingSize: state.servingSize,
                image: state.image,
                imageName: state.imageName,
                ingredients: state.ingredients,
                instructions: state.instructions
            }
            addDoc(colRef, { ...state.customRecipe })
            console.log(state.customRecipe)
        },
        addRecipeTitle(state, action) {
            state.title = action.payload
        },
        addEstimatedCookTime(state, action) {
            state.estimatedCookTime = action.payload
        },
        addServingSize(state, action) {
            state.servingSize = action.payload
        },
        addImage(state, action) {
            state.image = action.payload
        },
        setImageName(state, action) {
            state.imageName = action.payload
        },
        setItem(state, action) {
            state.item = action.payload
        },
        addIngredients(state) {
            state.ingredients = [...state.ingredients, state.item]
            localStorage.setItem(
                "ingredientArray",
                JSON.stringify([...state.ingredients, state.item])
            );
            state.item = ''
        },
        removeIngredients(state, action) {
            state.ingredients = state.ingredients.filter(
                (itemIndex) => state.ingredients.indexOf(itemIndex) !== action.payload
            )
            localStorage.setItem(
                "ingredientArray",
                JSON.stringify(
                    state.ingredients.filter(
                        (itemIndex) => state.ingredients.indexOf(itemIndex) !== action.payload
                    )
                )
            );
        },
        setStep(state, action) {
            state.step = action.payload
        },
        addStep(state) {
            state.instructions = [...state.instructions, state.step]
            localStorage.setItem(
                "instructionsArray",
                JSON.stringify([...state.instructions, state.step])
            );
            state.step = ''
        },
        removeStep(state, action) {
            state.instructions = state.instructions.filter(
                (itemIndex) => state.instructions.indexOf(itemIndex) !== action.payload
            )
            localStorage.setItem(
                "instructionsArray",
                JSON.stringify(
                    state.instructions.filter(
                        (itemIndex) => state.instructions.indexOf(itemIndex) !== action.payload
                    )
                )
            );
        },
        resetForm(state) {
            state.title = ''
            state.estimatedCookTime = ''
            state.servingSize = ''
            state.image = ''
            state.ingredients = JSON.parse(
                localStorage.getItem("ingredientArray") || "[]"
            )
            state.item = ''
            state.instructions = JSON.parse(
                localStorage.getItem("instructionsArray") || "[]"
            )
            state.step = ''
            state.customRecipe = {}
        },
        deleteCustomRecipe(state, action) {
            const docRef = doc(db, "customRecipes", action.payload)
            deleteDoc(docRef)
            state.showModal = false
        },
        modalhandler(state) {
            state.showModal = !state.showModal
        }

    }
});

export const customRecipeActions = customRecipeSlice.actions

