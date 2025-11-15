import { WithId } from 'mongodb';

export const getMongoViewModel = <T>(
    el: WithId<T>
): Omit<WithId<T>, '_id'> & { id: string } => {
    const { _id, ...rest } = el;

    return {
        ...rest,
        id: String(_id),
    };
};