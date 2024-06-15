import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  full_address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  phone: string;
}
