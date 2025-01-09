import { CreateResourceDTO } from '@/modules/resource/dtos';
import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { IResourceService } from '@modules/resource/services/resource.service';

import { Inject, Service } from 'typedi';

@Service()
export class CreateResourceUseCase {
    constructor(
        private readonly repository: ResourceRepository,
        @Inject('ResourceService')
        private readonly domainService: IResourceService,
    ) {}

    async execute(data: CreateResourceDTO): Promise<ResourceEntity> {
        const resource = new ResourceEntity(
            '', // ID will be generated by repository
            data.name,
            data.description,
            new Date(),
            new Date(),
        );

        this.domainService.validateResource(resource);
        const savedResource = await this.repository.create(resource);
        return this.domainService.enrichResourceData(savedResource);
    }
}
