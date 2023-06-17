import axios from "axios";

export const getRecipe = async (searchInput) => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY
        }&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
    )
        .catch(err => console.log(err))
        console.log(res.data)

    return res.data.recipes;
}

export const getRandomRecipe = async () => {
    const res = await axios
        .get(
            `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY
            }&number=1`
        )
        .catch((err) => {
            console.log(err);
        });

    return res.data.recipes
};