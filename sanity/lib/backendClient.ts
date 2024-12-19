import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const backEndClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})