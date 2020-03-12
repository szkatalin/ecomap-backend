import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {Address} from './address.entity';
import {PlaceCategoryDetails} from './place-category-details.entity';

@Entity()
export class BasePlace extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty({ type: Address })
    @OneToOne(
        () => Address,
        address => address.place,
        { eager: false }
    )
    @JoinColumn()
    address: Address;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty({ type: PlaceCategoryDetails })
    @OneToMany(
        () => PlaceCategoryDetails,
        placeCategoryDetails => placeCategoryDetails.place
    )
    categoryDetails: PlaceCategoryDetails;
}
