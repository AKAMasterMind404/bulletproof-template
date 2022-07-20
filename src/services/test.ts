import { Service, Inject, Container } from 'typedi';

@Service()
export default class TestService {

    constructor(@Inject('logger') private logger) {
    }

}