interface IUser {
    id: number;
    surname: string;
    name: string;
    age: number;
    employed: boolean;
};

async function updateObjectInArray<ObjectShape>(
    initialArray: ObjectShape[], 
    key: keyof ObjectShape, 
    value: ObjectShape[keyof ObjectShape],
    patch: Partial<ObjectShape>
): Promise<ObjectShape[]> {
    const newArray: ObjectShape[] = [...initialArray];
    const index: number = newArray.findIndex((obj) => obj[key] === value);
    if (index !== -1) {
        newArray[index] = { ...newArray[index], ...patch };
    }
    return newArray;
}

const users: IUser[] = [
    { id: 1, surname: "Smith", name: "John", age: 23, employed: true },
    { id: 2, surname: "Fletcher", name: "Bob", age: 18, employed: false },
    { id: 3, surname: "Taylor", name: "Alex", age: 29, employed: true },
    { id: 4, surname: "Turner", name: "Jack", age: 35, employed: true },
    { id: 5, surname: "Chapman", name: "Julia", age: 20, employed: false },
];

async function testUpdate(): Promise<void> {
    const updatedArray: IUser[] = await updateObjectInArray<IUser>(users, 'id', 4, { age: 40, employed: false })
    updatedArray.forEach(obj => console.log(obj));
}

testUpdate()