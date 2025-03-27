import { Module, DynamicModule } from "@nestjs/common";
import { RepositoryOrmModule } from "./orms/repository.orm.module";
import { InMemoryRepositoryModule } from "./in-memories/in.memory.repository.module";

@Module({})
export class MovieRepositoryModule {
  static forRoot(): DynamicModule {
    const isTesting = process.env.NODE_ENV === "test";
    return {
      module: MovieRepositoryModule,
      imports: isTesting ? [InMemoryRepositoryModule] : [RepositoryOrmModule],
      exports: isTesting ? [InMemoryRepositoryModule] : [RepositoryOrmModule],
    };
  }
}
