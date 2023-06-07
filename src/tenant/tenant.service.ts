import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateTenantDTO, UpdateTenantDTO } from './dto';
import * as argon from 'argon2';
import { TenantSigninDTO } from 'src/auth/dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
  ) {}

  /**
   * 세대 등록
   * --
   * @param tenant
   * @returns
   */
  async createTenant(tenant: CreateTenantDTO) {
    try {
      const result = await this.tenantRepository.save(tenant);
      // const { tenant_login_pw } = tenant;
      // const hash = await argon.hash(tenant_login_pw);
      // const result = await this.tenantRepository.save({
      //   ...tenant,
      //   tenant_login_pw: hash,
      // });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 전체 조회
   * --
   * @returns
   */
  async getTenantList(building_id: string) {
    try {
      const result = await this.tenantRepository.find({
        select: [
          'tenant_id',
          'tenant_login_id',
          'tenant_nm',
          'tenant_dong',
          'tenant_ho',
          'wallet_id',
          'created_at',
          'modified_at',
          'building_id',
        ],
        where: { building_id },
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 상세 조회
   * --
   * @param tenant_id
   * @returns
   */
  async getTenant(tenant_id: string) {
    try {
      const result = await this.tenantRepository.findOne({
        where: { tenant_id },
      });

      delete result.tenant_login_pw;
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 로그인
   * --
   * @param tenantInfo
   * @returns
   */
  async signinTenant(tenantInfo: TenantSigninDTO) {
    try {
      var cond = {};
      const { tenant_login_id, tenant_login_pw, wallet_id } = tenantInfo;

      if (wallet_id) {
        cond = { wallet_id };
      } else {
        cond = { tenant_login_id, tenant_login_pw };
      }

      const result = await this.tenantRepository.findOneOrFail({
        where: cond,
        relations: ['building'],
      });
      // const { tenant_login_pw: pw } = result;
      // const isMatch = await argon.verify(pw, tenant_login_pw);
      // if (!isMatch) {
      //   throw new Error('아이디나 비밀번호가 일치하지 않습니다.');
      // }

      delete result.tenant_login_pw;

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 정보 수정
   * --
   * @param tenantInfo
   * @returns
   */
  async updateTenant(tenantInfo: UpdateTenantDTO) {
    try {
      const { tenant_id, tenant_login_pw, ...updateInfo } = tenantInfo;
      let pw = tenant_login_pw;
      if (tenant_login_pw) {
        pw = await argon.hash(tenant_login_pw);
      }
      const result = await this.tenantRepository.update(tenant_id, {
        ...updateInfo,
        tenant_login_pw: pw,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 정보 삭제
   * --
   * @param tenant_id
   * @returns
   */
  async deleteTenant(tenant_id: string) {
    try {
      const result = await this.tenantRepository.delete(tenant_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
