import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './entities/branch.entity';
import { UserBranch } from 'src/users-branches/entities/user-branch.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserBranch)
    private userBranchRepository: Repository<UserBranch>,
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

  async create(createBranchDto: CreateBranchDto): Promise<any> {
    const { owner_id, name: branchName } = createBranchDto;

    // Check if the branch already exists
    const branchExists = await this.branchRepository.findOne({
      where: { name: branchName },
    });
    if (branchExists) {
      throw new HttpException('Branch already exists', HttpStatus.BAD_REQUEST);
    }

    // Create a new Branch entity
    const newBranch = this.branchRepository.create(createBranchDto);
    await this.branchRepository.save(newBranch);

    // Retrieve User entity
    const user = await this.userRepository.findOneBy({ id: owner_id });

    // Create a new UserBranch entity
    const newUserBranch = new UserBranch();
    newUserBranch.user = user; // Associate the retrieved User entity
    newUserBranch.branch = newBranch; // Associate the saved Branch entity

    // Save the new UserBranch entity
    const savedUserBranch = await this.userBranchRepository.save(newUserBranch);

    return {
      savedUserBranch,
    };
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

  async getBranchDetails(branchId: number): Promise<Branch> {
    return await this.branchRepository
      .createQueryBuilder('branch')
      .leftJoinAndSelect('branch.userBranches', 'userBranch')
      .leftJoinAndSelect('userBranch.user', 'user')
      .where('branch.id = :id', { id: branchId })
      .getOne();
  }

  async addUserToBranch(branchId: number, userId: number): Promise<any> {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });
    if (!branch) {
      throw new HttpException('Branch not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // check if user is already in branch
    const userBranchExists = await this.userBranchRepository
      .createQueryBuilder('userBranch')
      .where('userBranch.branch_id = :branchId', { branchId })
      .andWhere('userBranch.user_id = :userId', { userId })
      .getOne();

    if (userBranchExists) {
      throw new HttpException(
        'User is already in branch',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userBranch = new UserBranch();
    userBranch.branch = branch;
    userBranch.user = user;

    await this.userBranchRepository.save(userBranch);

    return {
      message: 'User added to branch successfully',
      status: HttpStatus.OK,
    };
  }
}
