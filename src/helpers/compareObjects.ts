export default function compareObjects(first:Object, second:Object){
    return JSON.stringify(first) === JSON.stringify(second)
}