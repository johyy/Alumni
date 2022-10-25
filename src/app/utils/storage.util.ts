export class StorageUtil {
    public static storageSave<T>(key: string, value: T[]) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public static storageRead<T>(key: string): T[] | undefined {
        const storedValue = sessionStorage.getItem(key);
        if(storedValue) {
            return JSON.parse(storedValue);
        }
        return undefined;
    }

    public static StorageSaveOne<T>(key: string, value: T) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    public static storageReadOne<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        if(storedValue) {
            return JSON.parse(storedValue);
        }
        return undefined;
    }
}
