import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { ActivityLog } from '../../entity/activity-log.entity';
import { AppDataSource } from '../../data-source';

@EventSubscriber()
export class ActivityLogSubscriber implements EntitySubscriberInterface<any> {
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
    const model = event.metadata?.tableName;
    if (!model || model === 'activity_logs') return; // skip logging itself

    const repo = AppDataSource.getRepository(ActivityLog);

    // Run outside of current query runner
    setImmediate(async () => {
      try {
        await repo.save({
          userId: null, // or fetch from context
          action,
          model,
          data: event.entity,
          ip: null,
          created_at: new Date(),
        });
      } catch (err) {
        console.error('Error saving activity log:', err);
      }
    });
  }
}
