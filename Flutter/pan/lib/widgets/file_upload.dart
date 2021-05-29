import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
//import 'package:image_picker/image_picker.dart';
import 'package:pan/res/sy_flutter_qiniu_storage.dart';
import 'package:qiniu_flutter_sdk/qiniu_flutter_sdk.dart';
import 'package:file_picker/file_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:crypto/crypto.dart';

void main() => runApp(new FileUpload());

Dio dio = new Dio();
Storage storage = Storage();


class FileUpload extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<FileUpload> {
  double _process = 0.0;
  PutController putController;
//  上传进度初始化
  double progressValue = 1;
  StorageStatus statusValue;

  //  上传参数
  String file_name;
  String hash_name;
  String size;
  String type;
  String url;
  int uid;

  @override
  void initState() {
    super.initState();
  }

  _onUpload() async {
    // 分片上传大小
    int partSize = 4;
    PlatformFile file;
    // 当前的任务状态

//    获取token
    var response = await dio.get("http://api.imiaoyu.top/api/uploadToken",);
    String token = response.data['token'];

    FilePickerResult result = await FilePicker.platform.pickFiles();
//    PlatformFile file = result.files.first;
    if(result != null) {
      file = result.files.first;
//
      file_name = file.name;
      var bytes = utf8.encode(file.name); // data being hashed
      var digest = sha1.convert(bytes).toString();
      hash_name = digest;
      size = file.size.toString();
      SharedPreferences prefs = await SharedPreferences.getInstance();
      uid =prefs.getInt("uid");

    } else {
      print('error');
    }


//    final syStorage = new SyFlutterQiniuStorage();
//    //监听上传进度
//    syStorage.onChanged().listen((dynamic percent) {
//      print('任务进度变化：进度：${percent.toStringAsFixed(4)}');
//      setState(() {
//        _process = 0.5;
//      });
//      print(percent);
//    });

    Fluttertoast.showToast(
        msg: '请等待',
        fontSize: 14,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIos: 1,
        textColor: Colors.black
    );

    print('创建 PutController');
    putController = PutController();
//    print('添加实际发送进度订阅');
//    addDisposer(putController.addSendProgressListener(onSendProgress));
    print('添加任务进度订阅');
    addDisposer(putController.addProgressListener(onProgress));
    print('添加状态订阅');
    addDisposer(putController.addStatusListener(onStatus));



    String key = DateTime.now().millisecondsSinceEpoch.toString() + '.' + file.path.split('.').last;
    type = key.split('.').last;

    storage.putFile(File(file.path), token,
      options: PutOptions(
      key: key,
      partSize: partSize,
      controller: putController,),
    )
      ..then((PutResponse response) {
        print('响应数据: ${jsonEncode(response.rawData)}');
        var a = jsonEncode(response.rawData['key']).replaceAll("\"", "");
        url = 'http://pan-qiniu.imiaoyu.top/'+ a.toString();
        loadDataByDio();
      })
      ..catchError((dynamic error) {
        print('发生错误: 连接超时');
      });

  }

  //取消上传
  _onCancel() {
    SyFlutterQiniuStorage.cancelUpload();
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      debugShowCheckedModeBanner: false,
      home: new Scaffold(
        appBar: new AppBar(
          title: const Text('七牛云存储SDK demo'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: new Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              LinearProgressIndicator(
                value: _process,
              ),
              RaisedButton(
                child: Text('上传'),
                onPressed: _onUpload,
              ),
              RaisedButton(
                child: Text('取消上传'),
                onPressed: () => putController?.cancel(),
              ),
            ],
          ),
        ),
      ),
    );
  }
  void onStatus(StorageStatus status) {
    print('状态变化: 当前任务状态：${status.toString()}');
    setState(() => statusValue = status);
  }
  void onProgress(double percent) {
    setState(() => progressValue = percent);
    print('任务进度变化：进度：${percent.toStringAsFixed(4)}');
  }

  void onSendProgress(double percent) {
    // setState(() => progressValue = percent);
    print('实际发送变化：进度：${percent.toStringAsFixed(4)}');
  }

  void addDisposer(void Function() addProgressListener) {}


//  获取token
//     uploadToken() async{
//       var response = await dio.get("http://api.imiaoyu.top/api/uploadToken",);
//       return response.data['token'].toString();
////       print(response.data['token']);
//     }

//  更新数据库
  loadDataByDio() async {


    var response = await dio.post("http://api.imiaoyu.top/api/newarticle", data: {
      "file_name": file_name,
      "hash_name": hash_name,
      "type": type,
      "size": size,
      "uid": uid,
      "url":url,
    });
//    dynamic rtn = jsonDecode(response.toString());
    if(response.statusCode == 200) {
      print("上传完成");
      Fluttertoast.showToast(
          msg: '上传完成',
          fontSize: 14,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          textColor: Colors.black
      );
    }else {
      Fluttertoast.showToast(
          msg: '上传失败',
          fontSize: 14,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIos: 1,
          textColor: Colors.black
      );
    }
    }

}