import moment from "moment";

export default class SocketService {
  public isRealString(str): boolean {
    return typeof str === 'string' && str.trim().length > 0;
  };

  public generateMessage(from, text){
    return {
      from,
      text,
      createdAt: moment().valueOf()
    };
  };
  
  public generateLocationMessage(from, lat, lng){
    return {
      from,
      url: `https://www.google.com/maps?q=${lat}, ${lng}`,
      createdAt: moment().valueOf()
    }
  }
}