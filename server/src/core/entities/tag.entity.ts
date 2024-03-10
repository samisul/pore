import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Word } from './word.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60 })
  title: string;

  @Column({ type: 'varchar', length: 180 })
  desc: string;

  @Column({ type: 'varchar', length: 15 })
  color: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Word, (word) => word.tags, { onDelete: 'CASCADE' })
  words: Word[];
}
