// export interface TodoCreateDTO {
//     title: string;
// }

// export interface TodoDTO {
//     id: number;
//     title: string;
// }

export interface TodoDTO {
    id: number;
    title: string;
    picture?: string;
    description: string;
}

export interface TodoCreateDTO {
    title: string;
    picture?: File;
    description: string;
}

export interface TodoAutoCompleteDTO {
    id: number;
    title: string;
    picture: string;
    description: string;
}