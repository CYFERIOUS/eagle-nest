import { TaskStatus } from "../task.model";

export class CreateTaskDto {
  title: string;
  description: string;
  status:TaskStatus.DONE | TaskStatus.IN_PROGRESS | TaskStatus.OPEN;

}
