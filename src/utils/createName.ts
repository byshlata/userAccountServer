import { Nullable } from "types";

export const createName = (link: Nullable<string> | undefined) => link && link.split('/').pop()
