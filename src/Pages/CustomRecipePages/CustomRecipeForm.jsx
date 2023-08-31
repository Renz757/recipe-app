import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDB } from "../../firebase_setup/firebase";
import { customRecipeActions } from "../../store/customRecipes-slice";
import InstructionList from "./CustomRecipeInstructions";
import IngredientsList from "./CustomRecipeIngredients";
import { Link } from "react-router-dom";


// TODO: Change from multistep form to normal form

const CustomRecipeForm = () => {
  const [name, setName] = useState("");
  const [serving, setServing] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [isImageTouched, setIsImageTouched] = useState(false);

  const dispatch = useDispatch();
  const recipeInfo = useSelector((state) => state.customRecipe);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // todo: move submit logic into redux thunk function 
  const submitHandler = async (event) => {
    event.preventDefault();

    let imageUrlLink = null;

    try {
      if (image != "") {
        setImageName(image.name);
        //get ref to image storage
        const imageRef = ref(imageDB, `images/${image.name}`);

        //upload image to storage
        await uploadBytes(imageRef, image);
        imageUrlLink = await getDownloadURL(imageRef);
        setImageUploaded(true);
      }
    } catch (error) {
      console.log(error);
    }
    if (imageUploaded || imageUrl != "") {
      //remove last element from array, empty string
      ingredients.slice(-1);
      instructions.slice(-1);

      const recipeData = {
        title: name,
        servingSize: serving,
        cookTime,
        image: image == "" ? imageUrl : imageUrlLink,
        imageName,
        ingredients,
        instructions,
      };

      console.log(recipeData);

      dispatch(
        customRecipeActions.submitForm({
          uid: user.uid,
          recipeData: recipeData,
        })
      );

      navigate("/customRecipes");
      setImageUploaded(false);
    }
  };


  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const servingHandler = (e) => {
    setServing(e.target.value);
  };

  const cookTimeHandler = (e) => {
    setCookTime(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const imageUrlHandler = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <>
      <div className="w-full h-auto bg-eggshell p-7">
        <form
          onSubmit={submitHandler}
          className=" md:max-w-md lg:max-w-xl mx-auto font-noto pt-10 pb-20"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-vandyke"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 w-full border rounded-md"
              onChange={nameHandler}
            />
          </div>
          {/* container */}
          <div className="mb-12 w-full flex flex-col md:flex-row md:justify-between gap-x-4">
            <div className="">
              <label
                htmlFor="servings"
                className="block text-lg font-medium text-vandyke"
              >
                Servings
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                required
                className="mt-1 p-2  border rounded-md w-full mb-4 md:mb-0"
                onChange={servingHandler}
              />
            </div>
            <div className="">
              <label
                htmlFor="cooktime"
                className="block text-lg font-medium text-vandyke"
              >
                Estimated Cook Time:
              </label>
              <input
                type="number"
                id="cooktime"
                name="cooktime"
                required
                className="mt-1 p-2 border rounded-md w-full mb-4 md:mb-0"
                onChange={cookTimeHandler}
              />
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-center text-xl font-bold">Upload an image</h1>
            {/* if image has data, make imageUrl disabled */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-lg font-medium text-vandyke"
              >
                Image File
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="mt-1 p-2 w-full border border-eggshell rounded-md"
                onChange={imageHandler}
                disabled={imageUrl == "" ? false : true}
              />
            </div>

            <h1 className="text-center">or</h1>

            {/* if imageUrl has data, make image disabled */}
            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-lg font-medium text-vandyke"
              >
                Image Url
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                required
                className="mt-1 p-2 w-full border rounded-md"
                onChange={imageUrlHandler}
                disabled={image == "" ? false : true}
              />
            </div>
          </div>
          <div className="mb-12">
            <h1 className="text-center text-xl font-bold mb-4">
              Add Ingredients
            </h1>
            <IngredientsList
              setIngredients={setIngredients}
              ingredients={ingredients}
            />
          </div>
          <div>
            <h1 className="text-center text-xl font-bold mb-4">
              Add Instructions
            </h1>
            <InstructionList
              setInstructions={setInstructions}
              instructions={instructions}
            />
          </div>

          <div className="flex pt-10">
            <button
              type="submit"
              className="bg-vandyke text-eggshell px-3 py-2 rounded-md m-2 w-8/12 mx-auto text-xl"
            >
              Create Custom Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomRecipeForm;
