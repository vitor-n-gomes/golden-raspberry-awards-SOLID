export abstract class ProducerRepository {
  abstract getProducers(): Promise<any[]>;
  abstract getProducerById(id: number): Promise<any>;
  abstract createProducer(producer: any): Promise<any>;
  abstract updateProducer(id: number, producer: Partial<any>): Promise<any>;
  abstract deleteProducer(id: number): Promise<void>;
  abstract syncMoviesToProducer(
    producerId: number,
    movies: any[]
  ): Promise<void>;
}
