import {Goal as GoalType} from "../types/goal.ts";
import {IoIosArrowDown} from "react-icons/io";
import {LiaTimesSolid} from "react-icons/lia";
import axios from "axios";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Task} from "../types/task.ts";
import {CiTrash} from "react-icons/ci";

interface GoalProps {
    userId: number
    goal: GoalType
    goals: GoalType[]
    setGoals: Dispatch<SetStateAction<GoalType[]>>
    setDisplayGoal: (displayGoal: boolean) => void
}

const Goal = (props: GoalProps) => {
    const { userId, goal, setGoals, setDisplayGoal } = props

    const [addTaskInput, setAddTaskInput] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [hideCheckedItems, setHideCheckedItems] = useState<boolean>(false)
    const [showChangeStatus, setShowChangeStatus] = useState<boolean>(false)
    const [editTitle, setEditTitle] = useState<boolean>(false)
    const [titleModified, setTitleModified] = useState<string>(goal.title)
    const [editDescription, setEditDescription] = useState<boolean>(false)
    const [descriptionModified, setDescriptionModified] = useState<string>(goal.description)
    const [editTargetDate, setEditTargetDate] = useState<boolean>(false)
    const [targetDateModified, setTargetDateModified] = useState<string>(goal.targetDate)

    const targetDateStringFormat = (date: string) => {
        const targetDate = new Date(date)
        // Dec 1, 10:38 AM
        const month = targetDate.toLocaleString('default', { month: 'short' })
        const day = targetDate.getDate()
        const hour = targetDate.getHours()
        const minute = targetDate.getMinutes()
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${month} ${day}, ${hour12}:${minute} ${ampm}`
    }

    const targetDatePassed = (date: string) => {
        if (new Date(date) < new Date() && goal.status !== "COMPLETED") {
            return true
        }
    }

    const onDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/goals/${userId}/${goal.id}`)
            if (response.status === 204) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setGoals((goals) => goals.filter((g) => g.id !== goal.id))
                setDisplayGoal(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get(`http://localhost:8080/api/tasks/${goal.id}`)
                if (response.status === 200) {
                    setTasks(response.data)
                    setLoading(false)
                } else {
                    console.error(response)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [goal.id])

    const addTask = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/tasks/${goal.id}`, {
                title: addTaskInput,
                isCompleted: false
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 201) {
                setTasks((tasks) => [...tasks, response.data])
                setAddTaskInput("")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toggleTaskCompletion = async (task: Task) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
                title: task.title,
                isCompleted: !task.isCompleted
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                setTasks((tasks) => tasks.map((t) => {
                    if (t.id === task.id) {
                        return response.data
                    }
                    return t
                }))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateTitle = async () => {
        if (goal.title === titleModified) {
            setEditTitle(false)
            return
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/goals/${userId}/${goal.id}`, {
                title: titleModified,
                description: descriptionModified,
                status: goal.status,
                targetDate: targetDateModified,
                color: goal.color
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                setGoals((goals) => goals.map((g) => {
                    if (g.id === goal.id) {
                        return response.data
                    }
                    return g
                }))
                setEditTitle(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateDescription = async () => {
        if (goal.description === descriptionModified) {
            setEditDescription(false)
            return
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/goals/${userId}/${goal.id}`, {
                title: titleModified,
                description: descriptionModified,
                status: goal.status,
                targetDate: targetDateModified,
                color: goal.color
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                setGoals((goals) => goals.map((g) => {
                    if (g.id === goal.id) {
                        return response.data
                    }
                    return g
                }))
                setEditDescription(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateStatus = async (status: string) => {
        if (goal.status === status) {
            setShowChangeStatus(false)
            return
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/goals/${userId}/${goal.id}`, {
                title: titleModified,
                description: descriptionModified,
                status: status,
                targetDate: targetDateModified,
                color: goal.color
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                setGoals((goals) => goals.map((g) => {
                    if (g.id === goal.id) {
                        return response.data
                    }
                    return g
                }))
                setShowChangeStatus(false)
                setDisplayGoal(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateTargetDate = async () => {
        if (goal.targetDate === targetDateModified) {
            setEditTargetDate(false)
            return
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/goals/${userId}/${goal.id}`, {
                title: titleModified,
                description: descriptionModified,
                status: goal.status,
                targetDate: targetDateModified,
                color: goal.color
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                setGoals((goals) => goals.map((g) => {
                    if (g.id === goal.id) {
                        return response.data
                    }
                    return g
                }))
                setEditTargetDate(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTask = async (task: Task) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/tasks/${task.id}`)
            if (response.status === 204) {
                setTasks((tasks) => tasks.filter((t) => t.id !== task.id))
                setShowChangeStatus(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return (
            <div
                className={"w-[800px] absolute rounded-md flex justify-center items-center h-[600px] bg-gray-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"}>
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-32 w-32"></div>
            </div>
        )
    }

    return (
        <div
            className={"w-[800px] max-h-[800px] overflow-y-scroll p-4 rounded-md absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-700 text-gray-100"}
        >
            <span
                onClick={() => setDisplayGoal(false)}
                className={"top-4 right-4 absolute text-xl cursor-pointer"}><LiaTimesSolid/>
            </span>
            { editTitle ? (
                <input
                    value={titleModified}
                    onChange={(e) => setTitleModified(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            updateTitle()
                        }
                    }}
                    className={"w-full p-2 outline-none h-10 rounded-md border-[1px] bg-gray-600 border-gray-600"}
                />
            ) : (
                <div className={"flex"}>
                    <h1 onClick={() => setEditTitle(true)} className={"text-xl cursor-pointer"}>{titleModified}</h1>
                </div>
            )}
            <div className={"flex text-sm mt-2"}>
                <span>in list</span>
                <span className={"ml-1.5 relative bg-gray-600 text-xs font-bold px-1.5 flex items-center"}>
                    { showChangeStatus && (
                        <div className={"w-32 absolute flex flex-col bg-gray-900"}>
                            <span onClick={() => updateStatus("PENDING")} className={"p-1 hover:bg-gray-600 cursor-pointer"}>Pending</span>
                            <span onClick={() => updateStatus("IN_PROGRESS")} className={"p-1 hover:bg-gray-600 cursor-pointer"}>In Progress</span>
                            <span onClick={() => updateStatus("CANCELLED")} className={"p-1 hover:bg-gray-600 cursor-pointer"}>Cancelled</span>
                            <span onClick={() => updateStatus("COMPLETED")} className={"p-1 hover:bg-gray-600 cursor-pointer"}>Completed</span>
                        </div>
                    )}
                    <p className={"cursor-pointer"} onClick={() => setShowChangeStatus(true)}>{goal.status}</p>
                    <IoIosArrowDown className={"cursor-pointer"} onClick={() => setShowChangeStatus(true)}/>
                </span>
            </div>
            <p className={"mt-6 text-lg font-bold"}>Target Date</p>
            <div className={"p-2 bg-gray-600 flex mt-2 items-center rounded-sm"}>
                { editTargetDate ? (
                    <>
                        <input
                            type={"datetime-local"}
                            value={targetDateModified}
                            onChange={(e) => setTargetDateModified(e.target.value)}
                            className={"w-full p-2 outline-none h-10 rounded-md border-[1px] bg-gray-600 text-gray-100 border-gray-600"}
                        />
                        <div className={"flex gap-x-3"}>
                            <span onClick={() => {
                                setEditTargetDate(false)
                                setTargetDateModified(goal.targetDate)
                            }} className={"p-2 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Cancel</span>
                            <span onClick={() => {
                                updateTargetDate()
                                setEditTargetDate(false)
                            }} className={"p-2 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Save</span>
                        </div>
                    </>
                ) : (
                    <>
                        <p onClick={() => setEditTargetDate(true)}>{targetDateStringFormat(targetDateModified)}</p>
                        {targetDatePassed(targetDateModified) && <span className={"ml-2 text-black bg-red-400 text-xs py-0.5 rounded-sm px-1.5"}>Overdue</span>}
                    </>
                )}
            </div>
            <p className={"mt-6 text-lg font-bold"}>Description</p>
            { editDescription ? (
                <>
                    <textarea
                        onChange={(e) => setDescriptionModified(e.target.value)}
                        defaultValue={descriptionModified}
                        className={"w-full mt-2 p-2 outline-none h-20 rounded-sm border-[1px] bg-gray-600 border-gray-600"}
                    />
                    <div className={"flex gap-x-3 mt-2"}>
                        <span onClick={updateDescription} className={"p-2 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Save</span>
                        <span onClick={() => {
                            setEditDescription(false)
                            setDescriptionModified(goal.description)
                        }} className={"p-2 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Cancel</span>
                    </div>
                </>
            ) : (
                <p onClick={() => setEditDescription(true)} className={"w-full mt-2 p-2 outline-none h-20 rounded-sm border-[1px] bg-gray-600 border-gray-600"}>{descriptionModified}</p>
            )}
            <div className={"flex items-center justify-between mt-6"}>
                <p className={"text-lg font-bold"}>Checklist</p>
                <div className={"flex items-center gap-x-3"}>
                    <span onClick={() => setHideCheckedItems(!hideCheckedItems)} className={"p-1.5 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>{hideCheckedItems ? "Show": "Hide"} checked items</span>
                    <span onClick={onDelete} className={"p-1.5 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Delete</span>
                </div>
            </div>
            <div className={"mt-2 flex flex-col gap-y-2"}>
                {hideCheckedItems ? (
                    tasks.filter((task) => !task.isCompleted).map((task) => (
                        <div key={task.id} className={"flex items-center justify-between"}>
                            <div className={"flex items-center gap-x-3"}>
                                <span onClick={() => toggleTaskCompletion(task)} className={`w-5 h-5 rounded-md border border-gray-500 flex items-center justify-center ${task.isCompleted ? "bg-blue-600" : ""}`}>
                                    {task.isCompleted && <span className={"text-xs text-gray-100"}>✓</span>}
                                </span>
                                <p>{task.title}</p>
                            </div>
                            <span onClick={() => deleteTask(task)} className={" cursor-pointer"}><CiTrash /></span>
                        </div>
                    ))
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className={"flex items-center justify-between"}>
                            <div className={"flex items-center gap-x-3"}>
                                <span onClick={() => toggleTaskCompletion(task)} className={`w-5 h-5 rounded-md border border-gray-500 flex items-center justify-center ${task.isCompleted ? "bg-blue-600" : ""}`}>
                                    {task.isCompleted && <span className={"text-xs text-gray-100"}>✓</span>}
                                </span>
                                <p>{task.title}</p>
                            </div>
                            <span onClick={() => deleteTask(task)} className={" cursor-pointer"}><CiTrash /></span>
                        </div>
                    ))
                )}
            </div>
            <div className={"mt-4 flex gap-x-3"}>
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && addTaskInput.trim() !== "") {
                            addTask()
                        }
                    }}
                    value={addTaskInput}
                    onChange={(e) => setAddTaskInput(e.target.value)}
                    className={"w-full p-2 outline-none bg-gray-600 h-10 rounded-md border-[1px] border-gray-600"}
                />
                <span onClick={addTask} className={"p-2 bg-gray-600 hover:bg-gray-400 duration-150 cursor-pointer rounded-sm"}>Add</span>
            </div>
        </div>
    )
}

export default Goal