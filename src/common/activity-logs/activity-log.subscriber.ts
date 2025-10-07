import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { ActivityLog } from '../../entity/activity-log.entity';

@EventSubscriber()
export class ActivityLogSubscriber implements EntitySubscriberInterface {
  afterInsert(event: InsertEvent<any>) {
    this.log(event, 'CREATE');
  }

  afterUpdate(event: UpdateEvent<any>) {
    this.log(event, 'UPDATE');
  }

  afterRemove(event: RemoveEvent<any>) {
    this.log(event, 'DELETE');
  }

  private async log(event: any, action: string) {
    const repo = event.manager.getRepository(ActivityLog);
    await repo.save({
      userId: event.queryRunner.data?.userId || null, // optional: track user
      action,
      model: event.metadata.tableName,
      data: event.entity,
    });
  }
}
