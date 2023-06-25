import { useState } from "react"

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]); 
    return (
        <>
            {shoppingList ? <h1>Shopping List is Empty</h1> : <h1>Shopping List Items</h1>}
        </>
    );
    
}

export default ShoppingList