const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schema = require('./schema')
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
    await mongoose.connect("mongodb://localhost:27017/graphql_demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });


  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
