import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column('text')
  synopsis: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  genre: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
