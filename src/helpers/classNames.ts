export default function closeClassName(className:string):(postfix?:string) => string{
    return function getClassName(postfix?: string): string { return className + postfix; }
}