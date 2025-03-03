import Fastify from "fastify";
import connectToDB from "./config/databaseConfig";

const fastify = Fastify();

const startFastifyServer = async () => {
  try {
    fastify.listen({ port: 3000 }, (error, address) => {
      if (error) {
        console.log(`Fastify listen fails: ${error}`);
        
        fastify.log.error(error);
        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });

    await connectToDB();
  } catch (error) {
    console.error(`Failed to start the server with fastify: ${error}`);
    process.exit(1);
  }
}

startFastifyServer();