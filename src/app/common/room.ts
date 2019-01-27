/**
 * Room Model
 */
export class Room {
    id: string;
    categoryId: string;
    clientId: string;
    chatId: string;
    title: string;
    link: string;
    description: string;

    constructor()
    { }
}

export class PostRoom {
    categoryId: string;
    clientId: string;
    title: string;
    link: string;
    description: string;

    constructor()
    { }
}
