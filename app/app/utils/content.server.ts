import PicoSanity from "picosanity";

export const projectId = "nu3tt2v6"
export const dataset = "production"
const apiVersion = "2021-12-10"

const client = new PicoSanity({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export default client;
