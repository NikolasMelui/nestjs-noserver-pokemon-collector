import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '20', nullable: false, unique: true })
  name: string;
}
