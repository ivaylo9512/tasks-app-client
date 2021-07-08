export type Todo = {
    id?: number,
    note: string,
    alertAt?: Date,
    from: Date,
    to: Date,
    daily: boolean,
}