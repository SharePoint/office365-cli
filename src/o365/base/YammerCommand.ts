import Command from "../../Command";

export default abstract class GraphCommand extends Command {
  protected get resource(): string {
    return 'https://www.yammer.com/api';
  }
}