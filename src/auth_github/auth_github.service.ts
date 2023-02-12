import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGithubService {
    constructor(private readonly httpService: HttpService) {}
    oauth({ code }): {me: string} {
        const clientID = '7e015d8ce32370079895'
        const clientSecret = '2b976af0e6b6ceea2b1554aa31d1fe94ea692cd9'
        return {me: '1111'};
        // console.log(`access token: ${tokenResponse.data}`);
        // return JSON.stringify(tokenResponse)

    }
}
