export interface Task {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    deadline: Date | null;
}
