import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  findAll(): Promise<Branch[]> {
    return this.branchRepository.find();
  }

  findOne(id: number): Promise<Branch> {
    return this.branchRepository.findOneBy({ id });
  }

  findByName(name: string): Promise<Branch> {
    return this.branchRepository.findOneBy({ name });
  }

  async create(branch: Branch): Promise<Branch> {
    const branchExists = await this.findByName(branch.name);
    if (branchExists) {
      throw new HttpException('Branch already exists', HttpStatus.BAD_REQUEST);
    }
    return this.branchRepository.save(branch);
  }

  async update(id: number, branch: Partial<Branch>): Promise<Branch> {
    const updatedBranch = await this.branchRepository.update(id, branch);
    if (updatedBranch.affected === 0) {
      throw new HttpException('Branch not found', HttpStatus.NOT_FOUND);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const branch = await this.branchRepository.delete(id);
    if (branch.affected === 0) {
      throw new HttpException('Branch not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Branch deleted successfully', status: HttpStatus.OK };
  }
}
