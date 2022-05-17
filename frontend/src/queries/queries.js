import { gql } from '@apollo/client';

const loginQuery = gql`
query($email: String,$password: String) {
  login(email:$email,password:$password){
    _id
    name
    email
    name
    profilePicture
    phone
    currency
    timezone
    language
    error
  }
}
`;

const countriesQuery = gql`
query{
  getAllCountries{
    _id
    name
  }
}
`;

const currencyQuery = gql`
query{
  getAllCurrencies{
    _id
    name
  }
}
`;

const getCartItemsQuery = gql`
query($_id: String){
  getCartItems(_id: $_id){
    _id
    name
    item
    orderQuantity
    description
    gift
  }
}
`;

const getOrderItems = gql`
query($_id: String){
  getOrderItems(_id: $_id){
    _id
    order
    name
    displayPicture
    orderQuantity
    shopName
    date
    item
    gift
    cartDescription
  }
}
`;




export {
  loginQuery,
  countriesQuery,
  currencyQuery,
  getCartItemsQuery,
  getOrderItems,
};
