import Fastify from "fastify";

const fastify = Fastify();

const startFastifyServer = () => {
  try {
    fastify.listen({ port: 3000 }, (error, address) => {
      if (error) {
        console.log(`Fastify listen fails: ${error}`);
        
        fastify.log.error(error);
        process.exit(1);
      }

      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    console.error(`Failed to start the server with fastify: ${error}`);
    process.exit(1);
  }
}

startFastifyServer();