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

  @Column()
  year: number;

  @Column()
  country: string;

  @Column()
  genre: string;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

  @Column({ default: 'https://picsum.photos/400/400' })
  poster: string;
}
