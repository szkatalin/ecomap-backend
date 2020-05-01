import { EntityRepository, Repository } from 'typeorm';
import { OperationalEvent } from './model/operational-event.entity';
import { CreateOperationalEventDto } from './dto/create-operational-event.dto';
import { User } from '../user/model/user.entity';
import { Recommendation } from './model/recommendation.entity';

@EntityRepository(OperationalEvent)
export class OperationalEventRepository extends Repository<OperationalEvent> {
  public async getOperationalEventByRecommendationId(
    recommendationId: number
  ): Promise<OperationalEvent> {
    return this.createQueryBuilder('operationalEvent')
      .leftJoinAndSelect('operationalEvent.recommendation', 'recommendation')
      .where('recommendation.id = :id', { id: recommendationId })
      .getOne();
  }

  public async isRecommendationEvaluated(recommendationId: number): Promise<boolean> {
    return !!(await this.getOperationalEventByRecommendationId(
      recommendationId
    ));
  }

  public async createOperationalEvent(
    recommendationId: number,
    userId: string,
    createOperationalEventDto: CreateOperationalEventDto
  ) {
    const operationalEvent = new OperationalEvent();
    const user = await this.manager.getRepository(User).findOne({ id: userId });
    const recommendation = await this.manager
      .getRepository(Recommendation)
      .findOne({ id: recommendationId });

    operationalEvent.reviewerUser = user;
    operationalEvent.recommendation = recommendation;
    operationalEvent.decision = createOperationalEventDto.decision;
    operationalEvent.comment = createOperationalEventDto.comment;

    return operationalEvent.save();
  }
}
