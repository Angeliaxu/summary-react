/* 
    从localStorage中取值
    
*/

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}
export const saveState = (state) => {
    try {
        // stringfy 是一个昂贵的操作
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
    } catch (error) {
        
    }
}