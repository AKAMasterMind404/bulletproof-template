import axios from 'axios';
import { Service, Inject } from 'typedi';
import logger from '../loaders/logger';

@Service()
export default class axiosService {
  constructor(@Inject('logger') private logger) { }

  public static async remoteServerPostAPI(payload, url, header) {
    let axiosResponse;
    await axios
      .post(url, payload, header)
      .then(function (response) {
        axiosResponse = response.data
      })
      .catch(function (error) {
        throw new Error(error.message);
      });

    return axiosResponse;
  }

  public static async remoteServerGetAPI(url, header) {
    logger.debug(`SENDING A GET REQUEST TO:${url}`)
    let axiosResponse;
    await axios
      .get(url,header)
      .then(function (response) {
        axiosResponse = response.data
      })
      .catch(function (error) {
        throw new Error(error.message);
      });

    return axiosResponse;
  }

}
