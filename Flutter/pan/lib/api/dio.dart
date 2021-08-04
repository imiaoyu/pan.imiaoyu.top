import 'package:pan/utils/request.dart';
import 'package:dio/dio.dart';

Dio dio = new Dio();
List listData = [];

loadDataByDio() async {
  var response = await dio.get("http://api.imiaoyu.top/api/liat?uid=10",);

      print(response.data);
      listData = response.data['data']['results'];
}

class Api {
  static login(data) {
    return Request.get(
      "/api/liat",
      params:data
    );
  }
}

