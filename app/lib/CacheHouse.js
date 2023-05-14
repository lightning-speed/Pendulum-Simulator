class CacheHouse{
  static init(){
    this.requests = [];
  }
  static saveRequest(request,data,validInterval){
    if(validInterval==null){
      validInterval = 0;
    }
    this.requests.push({
      request:JSON.stringify(request),
      data:data,
      expireTime:new Date().getTime()+validInterval

    })
  }
  static getFromCache(request){
    request = JSON.stringify(request);
    const time = new Date().getTime();
    let out = null;
    this.requests.forEach((item, i) => {
      if(item.expireTime<=time){
      }
      else{
        if(item.request==request){
          out = item.data;
          console.log(out);
          return out;
        }
      }
    });
    return out;
  }
  static request(request){
    let a = this.getFromCache(request);
    return a;
  }
}
