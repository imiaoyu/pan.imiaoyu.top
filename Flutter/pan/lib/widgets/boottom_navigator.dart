import 'package:flutter/material.dart';
import 'package:pan/widgets/file_view.dart';
import 'package:pan/widgets/square.dart';
import 'package:pan/widgets/grid_view.dart';
import 'package:pan/widgets/file_list.dart';
import 'package:pan/widgets/file_upload.dart';
//import 'package:flutter_demo/widgets/layout_demo.dart';
//import 'package:flutter_demo/widgets/dio_demo.dart';
//
//import 'dio_demo.dart';

class BottomNavigatorBarDemo extends StatefulWidget {

  String username, uid;

  BottomNavigatorBarDemo({Key key, @required this.username, @required this.uid})
      : super(key: key);

  List<Widget> widgets = [
    FileUpload(),
    FileList(),
    Square(),
    Gridview(),
//    LayoutDemo(),
//    DioDemo()
  ];
  @override
  _BottomNavigatorBarDemoState createState() => _BottomNavigatorBarDemoState();
}


class _BottomNavigatorBarDemoState extends State<BottomNavigatorBarDemo> {


  int _index = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text("底部选项卡"),
      // ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.arrow_upward),
            label: "上传",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.wb_cloudy),
            label: "文件",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.where_to_vote),
            label: "广场",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "我的",
          ),
        ],
        currentIndex: _index,
        onTap: (v) {
          setState(() {
            _index = v;
          });
        },
      ),
      // bottomNavigationBar: BottomAppBar(
      //   color: Theme.of(context).primaryColor,
      //   shape: CircularNotchedRectangle(),
      //   child: Row(
      //     mainAxisAlignment: MainAxisAlignment.spaceAround,
      //     children: [
      //       IconButton(icon: Icon(Icons.add), onPressed: () {}),
      //       SizedBox(),
      //       IconButton(icon: Icon(Icons.home), onPressed: () {}),
      //     ],
      //   ),
      // ),
      // floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.arrow_upward),
        onPressed: () {
          print("上传中....");
        },
      ),
      body: widget.widgets[_index],
    );
  }
}
