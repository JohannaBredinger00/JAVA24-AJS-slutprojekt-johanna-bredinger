import FilterSortPanel from "./FilterSortPanel";
import MemberForm from "./MemberForm";
import TaskBoard from "./TaskBoard";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";



export function App(){
    return(
        <>
            <TaskForm/>
            <TaskBoard/>
            <TaskCard/>
            <MemberForm/>
            {/* <FilterSortPanel/> */}
        </>
    )
}