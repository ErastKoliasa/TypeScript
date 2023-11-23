"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
function updateObjectInArray(initialArray, key, value, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        const newArray = [...initialArray];
        const index = newArray.findIndex((obj) => obj[key] === value);
        if (index !== -1) {
            newArray[index] = Object.assign(Object.assign({}, newArray[index]), patch);
        }
        return newArray;
    });
}
const users = [
    { id: 1, surname: "Smith", name: "John", age: 23, employed: true },
    { id: 2, surname: "Fletcher", name: "Bob", age: 18, employed: false },
    { id: 3, surname: "Taylor", name: "Alex", age: 29, employed: true },
    { id: 4, surname: "Turner", name: "Jack", age: 35, employed: true },
    { id: 5, surname: "Chapman", name: "Julia", age: 20, employed: false },
];
function testUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedArray = yield updateObjectInArray(users, 'id', 4, { age: 40, employed: false });
        updatedArray.forEach(obj => console.log(obj));
    });
}
testUpdate();
