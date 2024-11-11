import List, {defaultList} from "../Types/ListTypes/List"
import { useLocalStorage } from 'usehooks-ts'

  interface SavedListsType {
    lists: List[]
    createList: () => List;
    addList: (list:List) => List;
    readList: (id:string) => List| undefined ;
    updateList: (list:List) => void;
    deleteList: (list:List) => void;
    emptyLists: () => void;
  }
const useSavedLists = () : SavedListsType => {
    const [lists, setLists, removeLists] = useLocalStorage<List[]>('lists', [])

    const createList = () => defaultList();

    const addList = (list:List) : List => {
        setLists(x=>[...x,list]);
        return list;
    }

    const readList = (id:string) : List | undefined => {
        const list = lists.filter(o=>o.id===id)[0] ?? undefined;
        return list;
    }

    const updateList = (list: List) : void => {
        const temp = [...lists];
          
        const i = temp.findIndex(x=>x.id===list.id);

        temp[i] = list;

        setLists([...temp]);      
    }

    const deleteList = (list: List) : void => {
        const temp = [...lists];
          
        const i = temp.findIndex(x=>x.id===list.id);
        if(i >= 0){
            temp.splice(i, 1);
        }

        setLists([...temp]);
    }

    const emptyLists = () : void => removeLists();

    return {lists, createList, addList, readList, updateList, deleteList, emptyLists }
}

export default useSavedLists;