interface By {
    id: number;
    username: string;
    mail: string;
    first_name: string;
    last_name: string;
}
export class Reviev  {
    id: number;
    product: number;
    created_by: By;
    rate: any;
    text: string;

}
