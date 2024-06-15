import { Injectable } from '@nestjs/common';
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
    return this.branchRepository.findOneBy({ id: id });
  }

  async create(branch: Branch): Promise<Branch> {
    return this.branchRepository.save(branch);
  }

  async update(id: number, branch: Partial<Branch>): Promise<void> {
    await this.branchRepository.update(id, branch);
  }

  async remove(id: number): Promise<void> {
    await this.branchRepository.delete(id);
  }
}
