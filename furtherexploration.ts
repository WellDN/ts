//Mapped types work well with other features in this type manipulation section, for example here is a
//mapped type using a conditional type which returns either a true or false depending on
//whether an object has the property pii set to the literal true :

type ExtractPII<T> = {
    [Property in keyof T]: T[Property] extends { pii: true } ? true : false
};

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true};
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
//type ObjectsNeedingGPRDeletion = {
//    id: false;
//    name: true;
//}