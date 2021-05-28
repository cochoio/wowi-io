import { FastifyPluginAsync } from "fastify";

const version: FastifyPluginAsync = async (fastify) => {
  fastify.get("/_version", (req, reply) => {
    fastify.log.info("version");
    console.log("GET version");
    reply.send({
      _version: "1.0",
    });
  });
};

export default version;
