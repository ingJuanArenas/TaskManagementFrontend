export interface Task {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'in_course' | 'completed';
    deadline: Date | null;
}
