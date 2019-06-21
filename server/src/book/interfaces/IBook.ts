export interface IBook {
    name: string;
    authors: {_id: string, name: string};
    description: string;
    type: string;
    price: number;
}
