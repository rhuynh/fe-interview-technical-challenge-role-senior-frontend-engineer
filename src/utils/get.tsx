/** crude util in place of lodash.get */
export default function get(obj: any, path: string | Function) {
    if (typeof path === 'function') {
        return path(obj);
    }

    return path.split('.').reduce(function(a: any,b: any){
        return a && a[b];
    }, obj);
}