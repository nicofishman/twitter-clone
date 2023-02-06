import { RouterOutputs } from "@/utils/api";


export type TuitWithRecursiveComments = RouterOutputs['tuit']['get'][number] & {
    comments: TuitWithRecursiveComments[]
}
