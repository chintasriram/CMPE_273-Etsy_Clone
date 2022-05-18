import { gql } from '@apollo/client';



const userRegistrationMutation = gql`
    mutation register($name: String, $email: String, $password: String){
            register(name: $name, email: $email, password: $password){
            id
            _id
            name
            email
            password 
            profilePicture
            country
            currency
            about
            address
            city
            date
            gender
            phone
            token
        }
    }
`;


const addItemMutation = gql`
    mutation additem($name: String, $displayPicture: String, $category: String, $description: String,  
        $price: String,  $quantity: Int,  $salesCount: Int,  $shopId: String){
            additem(name: $name, displayPicture: $displayPicture, category: $category, 
                description: $description, price: $price, quantity: $quantity, salesCount: $salesCount, shopId: $shopId){
            _id
            name
            displayPicture
            category
            description
            price
            quantity
            salesCount
            shop
        }
    }
`;






export {
  userRegistrationMutation,
  addItemMutation,
};
