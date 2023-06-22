import axios from "axios";

export const getRandomRecipe = async () => {
    const res = await axios
        .get(
            `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY
            }&number=1`
        )
        .catch((err) => {
            console.log(err);
        });

    return res.data.recipes[0]
};