export interface Goal {
    id: number
    title: string
    description: string
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
    createdDate: string
    targetDate: string
    color: "RED" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GRAY" | "NONE"
}