import { Producer } from '../../models/producer.model';

export abstract class ProducerRepository {
  abstract getProducers(): Promise<Producer[]>;
  abstract getProducerById(id: string): Promise<Producer>;
  abstract createProducer(producer: Producer): Promise<Producer>;
  abstract updateProducer(id: string, producer: Producer): Promise<Producer>;
  abstract deleteProducer(id: string): Promise<void>;
}
