import { Injectable } from "@nestjs/common";
import { Producer } from "../../models/producer.model";
import { ProducerRepository } from "../interfaces/producer.repository";

@Injectable()
export class ProducerInMemory implements ProducerRepository {
  private static producers: Producer[] = [];

  async getProducers(): Promise<Producer[]> {
    return ProducerInMemory.producers;
  }

  async getProducerById(id: number): Promise<Producer> {
    const producer = ProducerInMemory.producers.find(
      (producer) => producer.id === id
    );
    if (!producer) {
      throw new Error(`Producer with id ${id} not found.`);
    }
    return producer;
  }

  async createProducer(producer: Producer): Promise<Producer> {
    producer.id = ProducerInMemory.producers.length + 1;
    ProducerInMemory.producers.push(producer);
    return producer;
  }

  async addManyProducers(producers: Producer[]): Promise<void> {
    producers.forEach((producer) => {
      this.createProducer(producer);
    });
  }

  async updateProducer(id: number, producer: Producer): Promise<Producer> {
    const index = ProducerInMemory.producers.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Producer with id ${id} not found.`);
    }
    ProducerInMemory.producers[index] = {
      ...ProducerInMemory.producers[index],
      ...producer,
    };
    return ProducerInMemory.producers[index];
  }

  async deleteProducer(id: number): Promise<void> {
    const index = ProducerInMemory.producers.findIndex(
      (producer) => producer.id === id
    );
    if (index === -1) {
      throw new Error(`Producer with id ${id} not found.`);
    }
    ProducerInMemory.producers.splice(index, 1);
  }

  async deleteAllProducers(): Promise<void> {
    ProducerInMemory.producers = [];
  }

  async syncMoviesToProducer(producerId: number, movies: any[]): Promise<void> {
    console.table(producerId, movies);
  }
}
