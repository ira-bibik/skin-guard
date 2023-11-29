import { getTokenFromLocalStorage, parseJwt } from "./localstorage.helper";

export function getRole() {
    const token = getTokenFromLocalStorage();
    const { role } = parseJwt(token);
    return role;
}