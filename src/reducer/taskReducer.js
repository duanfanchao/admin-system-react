export default function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    name: action.text,
                    selected: false,
                },
            ];
        }
        case 'changed': {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return { ...t, name: action.task.name, selected: action.task.selected };
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('未知 action: ' + action.type);
        }
    }
}


// export default function tasksReducer(draft, action) {
//     switch (action.type) {
//         case 'added': {
//             draft.push({
//                 id: action.id,
//                 name: action.text,
//                 selected: false,
//             })
//             break;
//         }
//         case 'changed': {
//             const index = draft.findIndex(ele => ele.id === action.task.id);
//             draft[index].name = action.task.name;
//             draft[index].selected = action.task.selected;
//             break;
//         }
//         case 'deleted': {
//             return draft.filter((t) => t.id !== action.id);
//         }
//         default: {
//             throw Error('未知 action: ' + action.type);
//         }
//     }
// }