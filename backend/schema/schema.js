const graphql = require('graphql');

const UserModel = require('../mongo/mongo_models/user.js');
const ItemModel = require('../mongo/mongo_models/item.js');
  
// const { getUserProfile } = require('../query/getUserProfile');
//const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config.js');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "userprofile",
  fields: () => ({
    id: { type: GraphQLID },
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      profilePicture: { type: GraphQLString },
      country: { type: GraphQLID },
      currency: { type: GraphQLID },
      about: {type: GraphQLString },
      address : { type:GraphQLString},
      city: { type:GraphQLString },
      date: { type: GraphQLString},
      gender: { type:GraphQLString },
      phone: { type:GraphQLString },
      token: { type:GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString }
  })
});


const ShopType = new GraphQLObjectType({
  name: 'Shop',
  fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      owner: { type: UserType },
      displayPicture: { type: GraphQLString },
  })
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
      displayPicture: { type: GraphQLString },
      category: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
      quantity: {type: GraphQLInt},
      salesCount: { type:GraphQLInt},
      shop: { type:GraphQLString }
  })
});

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString }
  })
});

const CurrencyType = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
      _id: { type: GraphQLID },
      name: { type: GraphQLString },
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          UserModel.findOne({ email: args.email.toUpperCase() }, function (err, result) {
            let res = {};
            if (err) {
              resolve(err);
            }
            if (result && result['password'] && passwordHash.verify(args.password, result['password'])) {
              res = result;
            } else {
              res.error = "Unsuccessful Login";
            }
            resolve(res);
          });
        });
      },
    },

  },
});



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {

          const query = {
            email: args.email,
            name: args.name,
            password: args.password,
        };
        const user = new UserModel(query);
        const result = user.save();
        let res = {};
        if(result){
            res = result;
        }else{
            res.error = "Error occured";
        }
        resolve(res);
        });
      },
    },

    additem:{
      type: ItemType,
      args: {
          name: { type: GraphQLString },
          displayPicture: { type: GraphQLString }, 
          category: { type: GraphQLString },
          description: { type: GraphQLString },
          price: { type: GraphQLString },
          quantity: { type: GraphQLInt },
          salesCount: { type: GraphQLInt },
          shopId: { type: GraphQLString }
      },
      resolve (parent, args){
        const query = {
          name: args.email,
          displayPicture: args.name,
          category: args.password,
          description: args.description,
          price: args.price,
          quantity: args.quantity,
          salesCount: args.salesCount,
          shopId: args.shopId
      };
      const item = new ItemModel(query);
      const result = item.save();
      let res = {};
      if(result){
          res = result;
      }else{
          res.error = "Error occured";
      }
      resolve(res);
      }
  },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
