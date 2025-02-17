import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SupplierFetcher {
  constructor(private configService: ConfigService) {}

  async fetchData(): Promise<any> {
    try {
      const arrowApiUrl = this.configService
        .get<string>('ARROW_API_URL', '')
        .trim();
      const ttiApiUrl = this.configService
        .get<string>('TTI_API_URL', '')
        .trim();

      if (!arrowApiUrl || !ttiApiUrl) {
        throw new Error(
          'Missing API URLs. Ensure ARROW_API_URL and TTI_API_URL are set in .env.',
        );
      }

      const [arrowResponse, ttiResponse] = await Promise.all([
        axios.get(arrowApiUrl),
        axios.get(ttiApiUrl),
      ]);

      return {
        arrow: arrowResponse.data,
        tti: ttiResponse.data,
      };
    } catch (error) {
      console.error('Error fetching supplier data:', error);
      return { arrow: [], tti: [] }; // Fallback to empty data
    }
  }
}
