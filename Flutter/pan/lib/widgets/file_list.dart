import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'dart:convert';
import 'dart:io';
import 'package:pan/api/dio.dart';
import 'package:pan/utils/request.dart';
import 'package:pan/res/listData.dart';
import 'package:shared_preferences/shared_preferences.dart';
Dio dio = new Dio();


class FileList extends StatefulWidget {
  @override
  _DismissiblePageState createState() => _DismissiblePageState();
}


class _listData {

  //构造函数
  const _listData({
    this.name,
    this.imageUrl,
  });

  final String name;
  final String imageUrl;
}

final List<_listData> datas = [
  _listData(
    name: '保时捷918 Spyder',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-7d8be6ebc4c7c95b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '兰博基尼Aventador',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-e3bfd824f30afaac?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '法拉利Enzo',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-a1d64cf5da2d9d99?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: 'Zenvo ST1',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-bf883b46690f93ce?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '迈凯伦F1',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-5a7b5550a19b8342?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '萨林S7',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-2e128d18144ad5b8?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '科尼赛克CCR',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-01ced8f6f95219ec?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '布加迪Chiron',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-7fc8359eb61adac0?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '轩尼诗Venom GT',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-d332bf510d61bbc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  ),
  _listData(
    name: '西贝尔Tuatara',
    imageUrl:
    'https://upload-images.jianshu.io/upload_images/2990730-3dd9a70b25ae6bc9?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  )
];



class _DismissiblePageState extends State<FileList> {


  //数据源var children = <Widget>[]
  List list = [
  ];

//  List<String> list = list.cast<String>();
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loadDataByDio();

//    return getBody();
  }





   loadDataByDio() async {
//     获取用户uid
        SharedPreferences prefs = await SharedPreferences.getInstance();
        int  uid =prefs.getInt("uid");
        print(uid);
//     请求数据
      Response  response = await dio.get('http://api.imiaoyu.top/api/list?uid=${uid}');
      var data = response.data['data']['results'];

      print("--------------------------------------------------------------------------");

      setState(() {
        list = data;
      });
//    if (response.statusCode == 200) {
//      print(response.data['data']['results']);
//      list = response.data['data']['results'];
//      return response.data['data']['results'];
//
//    }else{
//      print("账号或密码错误");
//    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('浏览文件'),
      ),
      body: _createListView(
      ),
    );
  }

  // 创建ListView
  Widget _createListView() {
    return ListView.builder(
      itemCount: list.length,
      itemBuilder: (context, index) {
        return Dismissible(
          // Key
//          key: Key('key_${datas[index].name}'),
          key: Key(list[index]['id'].toString()),
          // Child
          child: ListTile(
            title: Text('名称：' + list[index]['file_name']),
            subtitle: Text('大小：'+list[index]['size']),
//            dense: true,
            onTap: () {
              print(list[index]['file_name']);
            },

          ),

          onDismissed: (direction) {
            var _snackStr;
            if (direction == DismissDirection.endToStart) {
              // 从右向左  也就是删除
              _snackStr = '删除了${datas[index]}';
            } else if (direction == DismissDirection.startToEnd) {
              _snackStr = '收藏了${datas[index]}';
            }

            // 展示 SnackBar
            Scaffold.of(context).showSnackBar(SnackBar(
              content: Text(_snackStr),
              duration: Duration(milliseconds: 400),
            ));

            // 删除后刷新列表，以达到真正的删除
            setState(() {
              datas.removeAt(index);
            });
          },
          background: Container(
            color: Colors.green,
            // 这里使用 ListTile 因为可以快速设置左右两端的Icon
            child: ListTile(
              leading: Icon(
                Icons.bookmark,
                color: Colors.white,
              ),
            ),
          ),

          secondaryBackground: Container(
            color: Colors.red,
            // 这里使用 ListTile 因为可以快速设置左右两端的Icon
            child: ListTile(
              trailing: Icon(
                Icons.delete,
                color: Colors.white,
              ),
            ),
          ),

          confirmDismiss: (direction) async {
            var _confirmContent;

            var _alertDialog;

            if (direction == DismissDirection.endToStart) {
              // 从右向左  也就是删除
              _confirmContent = '确认删除${datas[index]}？';
              _alertDialog = _createDialog(
                _confirmContent,
                    () {
                  // 展示 SnackBar
                  Scaffold.of(context).showSnackBar(SnackBar(
                    content: Text('确认删除${datas[index]}'),
                    duration: Duration(milliseconds: 400),
                  ));
                  Navigator.of(context).pop(true);
                },
                    () {
                  // 展示 SnackBar
                  Scaffold.of(context).showSnackBar(SnackBar(
                    content: Text('不删除${datas[index]}'),
                    duration: Duration(milliseconds: 400),
                  ));
                  Navigator.of(context).pop(false);
                },
              );
            } else if (direction == DismissDirection.startToEnd) {
              _confirmContent = '确认收藏${datas[index]}？';
              _alertDialog = _createDialog(
                _confirmContent,
                    () {
                  // 展示 SnackBar
                  Scaffold.of(context).showSnackBar(SnackBar(
                    content: Text('确认收藏${datas[index]}'),
                    duration: Duration(milliseconds: 400),
                  ));
                  Navigator.of(context).pop(true);
                },
                    () {
                  // 展示 SnackBar
                  Scaffold.of(context).showSnackBar(SnackBar(
                    content: Text('不收藏${datas[index]}'),
                    duration: Duration(milliseconds: 400),
                  ));
                  Navigator.of(context).pop(false);
                },
              );
            }

            var isDismiss = await showDialog(
                context: context,
                builder: (context) {
                  return _alertDialog;
                });
            return isDismiss;
          },
        );
      },
    );
  }

  Widget _createDialog(
      String _confirmContent, Function sureFunction, Function cancelFunction) {
    return AlertDialog(
      title: Text('提示：'),
      content: Text(_confirmContent),
      actions: <Widget>[
        FlatButton(onPressed: sureFunction, child: Text('确定')),
        FlatButton(onPressed: cancelFunction, child: Text('取消')),
      ],
    );
  }



//
//  loadDataByDio() async {
//      var response = await Api.login(data);
//
//      if (response.statusCode == 200) {
//        print(response.data['data']['results']);
//
////        datalist = response.data;
//
//      }else{
//        print("账号或密码错误");
//      }
//    }

}
