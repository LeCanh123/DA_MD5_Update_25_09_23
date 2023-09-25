import { Allow } from "class-validator";

export class CreateCategoryDto {


    @Allow()
    token:string
    
    @Allow()
    category:{
        name:string,
        sex:string,
        block:string

    }

}

// {
//     "sex":"men",
//     "name":"áo gió",
//     "block":"null"
// }
