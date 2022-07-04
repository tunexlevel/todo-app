export interface Item {
    id: number,
    title: string,
    due_date: string | null,
    tasks: Task[],
    status: Status,
    created_at: string,
    updated_at: string
}

export interface Task {
    id: number,
    title: string,
    status: Status
}

enum Status {
    Unfineshed = 0,
    Completed = 1,
}